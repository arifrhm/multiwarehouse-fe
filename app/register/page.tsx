'use client'  

import { useState } from 'react'  
import { useRouter } from 'next/navigation'  
import { Button } from '@/components/ui/button'  
import { Input } from '@/components/ui/input'  
import { Label } from '@/components/ui/label'  
import Link from 'next/link'  
import { useRegisterMutation } from '@/lib/slices/apiSlice'  
import { toast } from 'sonner' // Diasumsikan Anda menggunakan sonner untuk toast notifications  

export default function RegisterPage() {  
  const [username, setUsername] = useState('')  
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')  
  const [confirmPassword, setConfirmPassword] = useState('')  
  const [provinsi, setProvinsi] = useState('')  
  const [kabupaten, setKabupaten] = useState('')  
  const [kecamatan, setKecamatan] = useState('')  

  const router = useRouter()  
  const [register, { isLoading, isError, error }] = useRegisterMutation()  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault()  

    // Validasi password  
    if (password !== confirmPassword) {  
      toast.error('Password tidak cocok')  
      return  
    }  

    try {  
      const result = await register({  
        username,  
        email,  
        password,  
        wilayah: {  
          provinsi,  
          kabupaten,  
          kecamatan  
        }  
      }).unwrap()  

      // Registrasi berhasil  
      toast.success('Registrasi berhasil')  
      router.push('/login')  
    } catch (err: any) {  
      // Tangani error dari API  
      const errorMessage = err?.data?.message || 'Registrasi gagal'  
      toast.error(errorMessage)  
    }  
  }  

  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">  
        <h1 className="text-2xl font-bold text-center">Register</h1>  
        <form onSubmit={handleSubmit} className="space-y-6">  
          <div>  
            <Label htmlFor="username">Username</Label>  
            <Input  
              id="username"  
              type="text"  
              value={username}  
              onChange={(e) => setUsername(e.target.value)}  
              required  
            />  
          </div>  
          <div>  
            <Label htmlFor="email">Email</Label>  
            <Input  
              id="email"  
              type="email"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              required  
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
            />  
          </div>  
          <div>  
            <Label htmlFor="confirmPassword">Confirm Password</Label>  
            <Input  
              id="confirmPassword"  
              type="password"  
              value={confirmPassword}  
              onChange={(e) => setConfirmPassword(e.target.value)}  
              required  
            />  
          </div>  
          <div>  
            <Label htmlFor="provinsi">Provinsi</Label>  
            <Input  
              id="provinsi"  
              type="text"  
              value={provinsi}  
              onChange={(e) => setProvinsi(e.target.value)}  
              required  
            />  
          </div>  
          <div>  
            <Label htmlFor="kabupaten">Kabupaten</Label>  
            <Input  
              id="kabupaten"  
              type="text"  
              value={kabupaten}  
              onChange={(e) => setKabupaten(e.target.value)}  
              required  
            />  
          </div>  
          <div>  
            <Label htmlFor="kecamatan">Kecamatan</Label>  
            <Input  
              id="kecamatan"  
              type="text"  
              value={kecamatan}  
              onChange={(e) => setKecamatan(e.target.value)}  
              required  
            />  
          </div>  
          <Button   
            type="submit"   
            className="w-full"   
            disabled={isLoading}  
          >  
            {isLoading ? 'Registering...' : 'Register'}  
          </Button>  
        </form>  
        <p className="text-center">  
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>  
        </p>  
      </div>  
    </div>  
  )  
}