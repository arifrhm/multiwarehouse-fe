'use client'  

import { useState, useEffect } from 'react'  
import { useRouter } from 'next/navigation'  
import { Button } from '@/components/ui/button'  
import { Input } from '@/components/ui/input'  
import { Label } from '@/components/ui/label'  
import Link from 'next/link'  
import { useLoginMutation } from '@/lib/slices/apiSlice'  
import { useAppDispatch, useAppSelector } from '@/lib/hooks'  
import { setCredentials } from '@/lib/slices/authSlice'  
import { showSuccessToast, showErrorToast } from '@/lib/utils/toast'  
import Cookies from 'js-cookie'  

export default function LoginPage() {  
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('')  
  const [login, { isLoading }] = useLoginMutation()  
  const dispatch = useAppDispatch()  
  const router = useRouter()  
  
  // Ambil state auth untuk cek user yang sudah login  
  const { user } = useAppSelector((state) => state.auth)  

  // Redirect jika sudah login  
  useEffect(() => {  
    if (user?.userId) {  
      router.push('/')  
    }  
  }, [user, router])  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault()  
    
    try {  
      // Validasi sederhana  
      if (!username || !password) {  
        showErrorToast('Username dan password harus diisi')  
        return  
      }  

      // Kirim request login  
      const response = await login({   
        username,   
        password   
      }).unwrap()  

      // Simpan kredensial di Redux  
      dispatch(setCredentials({  
        userId: response.userId,  
        token: response.token,  
      }))  

      // Simpan token dan role ke cookies  
      Cookies.set('token', response.token, {   
        expires: 1, // 1 hari   
        path: '/'   
      })

      // Tampilkan toast sukses  
      showSuccessToast('Login berhasil')  
    } catch (error: any) {  
      // Tangani error login  
      console.error('Login error:', error)  
      showErrorToast(  
        error?.data?.message ||   
        'Login gagal. Silakan coba lagi.'  
      )  
    }  
  }  

  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">  
        <h1 className="text-2xl font-bold text-center">Login</h1>  
        <form onSubmit={handleSubmit} className="space-y-6">  
          <div>  
            <Label htmlFor="username">Username</Label>  
            <Input  
              id="username"  
              type="text"  
              value={username}  
              onChange={(e) => setUsername(e.target.value)}  
              required  
              disabled={isLoading}  
            />  
          </div>  
          <div>  
            <Label htmlFor="password">Password</Label>  
            <Input  
              id="password"  
              type="password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
              required  
              disabled={isLoading}  
            />  
          </div>  
          <Button   
            type="submit"   
            className="w-full"   
            disabled={isLoading}  
          >  
            {isLoading ? 'Logging in...' : 'Login'}  
          </Button>  
        </form>  
        <p className="text-center">  
          Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>  
        </p>  
      </div>  
    </div>  
  )  
}