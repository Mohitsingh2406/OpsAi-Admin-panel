import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude /admin/login from the check
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const authCookie = request.cookies.get('admin_session');
    
    // Basic check - if cookie is not present, redirect to login
    if (!authCookie || authCookie.value !== 'authenticated_admin_mock_token') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
