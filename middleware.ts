import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Admin routes that need protection
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = req.nextUrl.pathname.startsWith('/admin/auth/login');
  const isPublicRoute = req.nextUrl.pathname === '/';
  
  // If not an admin route or it's a public route, proceed normally
  if (!isAdminRoute || isPublicRoute) {
    return NextResponse.next();
  }
  
  // If this is the login page, allow access
  if (isLoginPage) {
    return NextResponse.next();
  }
  
  // Check for authentication token in cookies
  const hasSessionCookie = req.cookies.has('sb-auth-token') || 
                          req.cookies.has('supabase-auth-token');
  
  // Demo mode - allow special demo cookie
  const hasDemoCookie = req.cookies.has('debugshala-demo-mode');
  
  // If no auth token and trying to access protected admin route, redirect to login
  if (!hasSessionCookie && !hasDemoCookie) {
    const url = new URL('/admin/auth/login', req.url);
    url.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // User is authenticated, allow access to admin routes
  return NextResponse.next();
}

// Apply middleware to admin routes only
export const config = {
  matcher: ['/admin/:path*'],
};
