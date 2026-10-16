import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'dh_admin_session';
export const LEGACY_ADMIN_COOKIE_NAME = 'atd_admin_session';

/**
 * Kiểm tra xem request có session cookie admin hợp lệ hay không
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME) || cookieStore.get(LEGACY_ADMIN_COOKIE_NAME);
  return Boolean(sessionCookie && sessionCookie.value === 'authenticated');
}

/**
 * Kiểm tra admin session từ NextRequest (dùng trong API routes)
 */
export function verifyAdminSessionFromRequest(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME) || req.cookies.get(LEGACY_ADMIN_COOKIE_NAME);
  return Boolean(sessionCookie && sessionCookie.value === 'authenticated');
}
