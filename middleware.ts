import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode, JwtPayload } from 'jwt-decode'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const publicPaths = ['/login', '/register']
  const path = request.nextUrl.pathname

  const isTokenValid = (token: string): boolean => {
    try {
      if (!token) return false

      const decodedToken = jwtDecode<JwtPayload>(token)
      
      const currentTime = Math.floor(Date.now() / 1000)
      return decodedToken.exp !== undefined && decodedToken.exp > currentTime
    } catch {
      return false
    }
  }

  const validToken = token ? isTokenValid(token) : false

  if (!validToken && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (validToken && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && !validToken) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/laporan/:path*',
    '/admin/:path*',
    '/login',
    '/register'
  ]
}