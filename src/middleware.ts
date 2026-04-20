import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const PROTECTED = ['/profile', '/orders', '/checkout']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a protected route
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))

  if (isProtected) {
    // Firebase auth is client-side; we use a cookie set on login as a lightweight gate
    // The real protection is enforced in the page components via useAuth + redirect
    const authCookie = request.cookies.get('brewhaus_session')
    if (!authCookie) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/orders/:path*', '/checkout/:path*'],
}
