import { NextResponse } from 'next/server'  
import type { NextRequest } from 'next/server'  
import { cookies } from 'next/headers'  

export function middleware(request: NextRequest) {  
  // Ambil cookies menggunakan server-side cookies  
  const cookieStore = cookies()  
  const token = cookieStore.get('token')?.value  

  // Path yang tidak memerlukan autentikasi  
  const publicPaths = ['/login', '/register']  
  const path = request.nextUrl.pathname  

  // Jika tidak ada token dan bukan di halaman publik, redirect ke login  
  if (!token && !publicPaths.includes(path)) {  
    return NextResponse.redirect(new URL('/login', request.url))  
  }  

  // Jika sudah ada token dan mengakses halaman login/register, redirect ke beranda  
  if (token && publicPaths.includes(path)) {  
    return NextResponse.redirect(new URL('/', request.url))  
  }  

  return NextResponse.next()  
}  

// Konfigurasi route yang akan diproteksi  
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