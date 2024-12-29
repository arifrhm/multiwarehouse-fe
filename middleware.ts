import { NextResponse } from 'next/server'  
import type { NextRequest } from 'next/server'  
import { cookies } from 'next/headers'  
import { jwtDecode } from 'jwt-decode' // Pastikan install jwt-decode  

export function middleware(request: NextRequest) {  
  // Ambil cookies menggunakan server-side cookies  
  const cookieStore = cookies()  
  const token = cookieStore.get('token')?.value  

  // Path yang tidak memerlukan autentikasi  
  const publicPaths = ['/login', '/register']  
  const path = request.nextUrl.pathname  

  // Fungsi untuk memeriksa validitas token  
  const isTokenValid = (token: string) => {  
    try {  
      if (!token) return false  

      // Decode token untuk memeriksa expiration  
      const decodedToken: any = jwtDecode(token)  
      
      // Periksa apakah token sudah kadaluarsa  
      const currentTime = Math.floor(Date.now() / 1000)  
      return decodedToken.exp > currentTime  
    } catch (error) {  
      return false  
    }  
  }  

  // Cek validitas token  
  const validToken = token ? isTokenValid(token) : false  

  // Skenario 1: Tidak ada token dan mengakses halaman yang memerlukan autentikasi  
  if (!validToken && !publicPaths.includes(path)) {  
    return NextResponse.redirect(new URL('/login', request.url))  
  }  

  // Skenario 2: Token valid dan mengakses halaman login/register  
  if (validToken && publicPaths.includes(path)) {  
    return NextResponse.redirect(new URL('/', request.url))  
  }  

  // Skenario 3: Token tidak valid  
  if (token && !validToken) {  
    // Buat response baru untuk menghapus token yang tidak valid  
    const response = NextResponse.redirect(new URL('/login', request.url))  
    response.cookies.delete('token')  
    return response  
  }  

  // Lanjutkan request jika memenuhi persyaratan  
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