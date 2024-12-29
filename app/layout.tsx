// app/layout.tsx  
import './globals.css'  
import { Inter } from 'next/font/google'  
import { ReduxProvider } from '@/lib/providers/ReduxProvider'  
import { AuthProvider } from '@/components/AuthContext'  
import { Toaster } from '@/components/ui/sonner' // Tambahkan toast jika digunakan  

const inter = Inter({ subsets: ['latin'] })  

export const metadata = {  
  title: 'Sistem Monitoring dan Evaluasi Program Bantuan Sosial',  
  description: 'Dashboard untuk monitoring dan evaluasi program bantuan sosial',  
}  

export default function RootLayout({  
  children,  
}: {  
  children: React.ReactNode  
}) {  
  return (  
    <html lang="en">  
      <body className={inter.className}>  
        <ReduxProvider>  
          <AuthProvider>  
            {children}  
            <Toaster />  
          </AuthProvider>  
        </ReduxProvider>  
      </body>  
    </html>  
  )  
}