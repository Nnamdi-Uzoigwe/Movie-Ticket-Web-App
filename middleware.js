import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the user is trying to access the home page
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Continue to the requested path
  return NextResponse.next();
}

// Specify which paths this middleware should apply to
export const config = {
  matcher: ['/'], // Apply middleware to the root path
};
