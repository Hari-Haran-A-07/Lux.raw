/**
 * Rate limiter middleware for Lux.raw API routes.
 * Uses a sliding window algorithm backed by Redis.
 *
 * Usage: Call `applyRateLimit(req, options)` at the top of an API route handler.
 */

import { type NextRequest, NextResponse } from 'next/server';
import { getRedisClient, increment } from '@/lib/cache/redis-client';

export interface RateLimitOptions {
  /** Maximum number of requests allowed within the window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
  /** Optional key prefix to namespace different route limits */
  namespace?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // Unix timestamp (seconds)
  response?: NextResponse;
}

/** Default rate limit for general API routes */
export const DEFAULT_LIMIT: RateLimitOptions = {
  limit: 100,
  windowSeconds: 60,
  namespace: 'api',
};

/** Stricter limit for sensitive routes (auth, checkout) */
export const STRICT_LIMIT: RateLimitOptions = {
  limit: 10,
  windowSeconds: 60,
  namespace: 'strict',
};

/** Very tight limit for OTP / password reset endpoints */
export const AUTH_LIMIT: RateLimitOptions = {
  limit: 5,
  windowSeconds: 300,
  namespace: 'auth',
};

/**
 * Derive a stable identifier for the requester.
 * Prefers authenticated user ID, falls back to IP.
 */
function getIdentifier(req: NextRequest): string {
  const userId = req.headers.get('x-user-id');
  if (userId) return `user:${userId}`;

  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return `ip:${ip}`;
}

/**
 * Apply sliding window rate limiting to a Next.js API route.
 *
 * @example
 * // In an API route handler:
 * const { success, response } = await applyRateLimit(req, STRICT_LIMIT);
 * if (!success) return response!;
 */
export async function applyRateLimit(
  req: NextRequest,
  options: RateLimitOptions = DEFAULT_LIMIT
): Promise<RateLimitResult> {
  const { limit, windowSeconds, namespace = 'api' } = options;
  const identifier = getIdentifier(req);

  // Sliding window: bucket by current window start (floor to windowSeconds)
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % windowSeconds);
  const key = `rl:${namespace}:${identifier}:${windowStart}`;

  let count: number;
  try {
    count = await increment(key, windowSeconds);
  } catch {
    // If Redis is unavailable, fail open to avoid blocking legitimate traffic
    console.error('[RateLimit] Redis unavailable — allowing request');
    return { success: true, limit, remaining: limit, resetAt: now + windowSeconds };
  }

  const remaining = Math.max(0, limit - count);
  const resetAt = windowStart + windowSeconds;

  if (count > limit) {
    const response = NextResponse.json(
      {
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Please slow down.',
          status: 429,
        },
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(resetAt),
          'Retry-After': String(resetAt - now),
        },
      }
    );
    return { success: false, limit, remaining: 0, resetAt, response };
  }

  return { success: true, limit, remaining, resetAt };
}

/**
 * Build rate limit headers to attach to successful responses.
 */
export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetAt),
  };
}
