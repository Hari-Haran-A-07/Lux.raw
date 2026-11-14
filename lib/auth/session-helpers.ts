/**
 * Session utilities for Lux.raw.
 * Wraps NextAuth getServerSession with typed role checks and redirect guards.
 */

import { getServerSession as nextAuthGetServerSession, type Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth-options';

export type UserRole = 'CUSTOMER' | 'VIP' | 'STAFF' | 'ADMIN' | 'SUPER_ADMIN';

export interface LuxSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: UserRole;
    isVip: boolean;
    customerId?: string;
  };
}

// ---------------------------------------------------------------------------
// Core session getter
// ---------------------------------------------------------------------------

/**
 * Typed wrapper around NextAuth's getServerSession.
 * Returns null if the user is not authenticated.
 */
export async function getSession(): Promise<LuxSession | null> {
  const session = await nextAuthGetServerSession(authOptions);
  return session as LuxSession | null;
}

/**
 * Get session and throw if unauthenticated.
 * Use in server components and API routes that require authentication.
 */
export async function requireSession(): Promise<LuxSession> {
  const session = await getSession();
  if (!session) {
    redirect('/auth/login');
  }
  return session;
}

// ---------------------------------------------------------------------------
// Role helpers
// ---------------------------------------------------------------------------

const ROLE_HIERARCHY: Record<UserRole, number> = {
  CUSTOMER: 0,
  VIP: 1,
  STAFF: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

/**
 * Check if a user has at least the given role level.
 */
export function hasRole(session: LuxSession, minRole: UserRole): boolean {
  const userLevel = ROLE_HIERARCHY[session.user.role] ?? 0;
  const requiredLevel = ROLE_HIERARCHY[minRole] ?? 0;
  return userLevel >= requiredLevel;
}

/**
 * Redirect if user does not have the required role.
 */
export async function requireRole(minRole: UserRole): Promise<LuxSession> {
  const session = await requireSession();
  if (!hasRole(session, minRole)) {
    redirect('/403');
  }
  return session;
}

/** Convenience: require admin or above */
export function requireAdmin() {
  return requireRole('ADMIN');
}

/** Convenience: require staff or above */
export function requireStaff() {
  return requireRole('STAFF');
}

// ---------------------------------------------------------------------------
// Redirect guards
// ---------------------------------------------------------------------------

/**
 * Redirect authenticated users away from auth pages (login, register).
 * Call at the top of login/register server components.
 */
export async function redirectIfAuthenticated(to = '/'): Promise<void> {
  const session = await getSession();
  if (session) {
    redirect(to);
  }
}

/**
 * Redirect unauthenticated users to login.
 * Preserves the current URL as a `callbackUrl` query param.
 */
export async function redirectIfUnauthenticated(currentPath: string): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`);
  }
}
