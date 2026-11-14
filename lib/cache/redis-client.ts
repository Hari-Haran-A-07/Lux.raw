/**
 * Redis client for Lux.raw — connection pooling, TTL helpers,
 * and cache-aside pattern utilities.
 *
 * Uses `ioredis` under the hood. Install with: pnpm add ioredis
 */

import Redis, { type RedisOptions } from 'ioredis';

// ---------------------------------------------------------------------------
// Singleton client (connection pooling via ioredis)
// ---------------------------------------------------------------------------

let client: Redis | null = null;

export function getRedisClient(): Redis {
  if (client) return client;

  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is not set.');
  }

  const options: RedisOptions = {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
    retryStrategy(times: number) {
      if (times > 5) return null; // stop retrying
      return Math.min(times * 100, 2000);
    },
  };

  client = new Redis(redisUrl, options);

  client.on('error', (err: Error) => {
    console.error('[Redis] Connection error:', err.message);
  });

  client.on('connect', () => {
    console.info('[Redis] Connected successfully.');
  });

  return client;
}

// ---------------------------------------------------------------------------
// TTL constants (seconds)
// ---------------------------------------------------------------------------

export const TTL = {
  ONE_MINUTE: 60,
  FIVE_MINUTES: 300,
  TEN_MINUTES: 600,
  ONE_HOUR: 3600,
  SIX_HOURS: 21_600,
  ONE_DAY: 86_400,
  ONE_WEEK: 604_800,
} as const;

// ---------------------------------------------------------------------------
// Cache-aside pattern helpers
// ---------------------------------------------------------------------------

/**
 * Get a cached value or execute the factory function and cache its result.
 *
 * @param key - Redis cache key
 * @param factory - Async function that produces the value on cache miss
 * @param ttl - Time-to-live in seconds
 */
export async function getOrSet<T>(
  key: string,
  factory: () => Promise<T>,
  ttl: number = TTL.TEN_MINUTES
): Promise<T> {
  const redis = getRedisClient();
  const cached = await redis.get(key);

  if (cached !== null) {
    return JSON.parse(cached) as T;
  }

  const value = await factory();
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
  return value;
}

/**
 * Invalidate one or more cache keys.
 */
export async function invalidate(...keys: string[]): Promise<void> {
  if (keys.length === 0) return;
  const redis = getRedisClient();
  await redis.del(...keys);
}

/**
 * Invalidate all keys matching a pattern (e.g. `products:*`).
 * Uses SCAN to avoid blocking the Redis server.
 */
export async function invalidatePattern(pattern: string): Promise<void> {
  const redis = getRedisClient();
  let cursor = '0';

  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    cursor = nextCursor;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== '0');
}

/**
 * Increment a counter with an optional TTL (useful for rate limiting).
 */
export async function increment(key: string, ttl?: number): Promise<number> {
  const redis = getRedisClient();
  const result = await redis.incr(key);
  if (result === 1 && ttl) {
    await redis.expire(key, ttl);
  }
  return result;
}
