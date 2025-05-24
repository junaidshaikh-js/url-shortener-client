import { NextResponse, type NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const response = NextResponse.next()

  const pathname = req.nextUrl.pathname
  // if shortCode pathname
  if (/^\/[a-zA-Z1-9]+$/.test(pathname)) return response

  const authToken = req.cookies.get('auth_token')

  if (pathname === '/' && authToken) {
    return NextResponse.redirect(new URL('/account/dashboard', req.url))
  }

  if (!authToken && pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api
     * - _next/static
     * - _next/image
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
