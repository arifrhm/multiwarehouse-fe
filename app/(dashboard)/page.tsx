'use client'  

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"  
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'  
import { useGetStatistikQuery } from "@/lib/slices/apiSlice"  
import { Skeleton } from "@/components/ui/skeleton"  

export default function StatisticsPage() {  
  const {   
    data: statistik,   
    isLoading,   
    isError   
  } = useGetStatistikQuery()  

  // Fungsi untuk transformasi data chart  
  const getPenerimaChartData = () => {  
    return statistik?.penerima_per_program.map(program => ({  
      _id: program._id,  
      total_penerima: program.total_penerima  
    })) || []  
  }  

  const getPenyaluranChartData = () => {  
    return statistik?.penyaluran_per_wilayah.map(wilayah => ({  
      _id: wilayah._id,  
      total_penyaluran: wilayah.total_penyaluran  
    })) || []  
  }  

  // Loading state  
  if (isLoading) {  
    return (  
      <div className="container mx-auto p-4">  
        <Skeleton className="h-10 w-1/2 mb-4" />  
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">  
          <Skeleton className="h-24" />  
        </div>  
        <div className="mt-8">  
          <Skeleton className="h-10 w-1/3 mb-4" />  
          <Skeleton className="h-[300px]" />  
        </div>  
      </div>  
    )  
  }  

  // Error state  
  if (isError) {  
    return (  
      <div className="container mx-auto p-4">  
        <div className="text-red-500">  
          Gagal memuat statistik. Silakan coba lagi nanti.  
        </div>  
      </div>  
    )  
  }  

  return (  
    <div className="container mx-auto p-4">  
      <h1 className="text-2xl font-bold mb-4">Statistik Program Bantuan Sosial</h1>  
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">  
        <Card>  
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">  
            <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>  
          </CardHeader>  
          <CardContent>  
            <div className="text-2xl font-bold">{statistik?.total_laporan || 0}</div>  
          </CardContent>  
        </Card>  
      </div>  

      <div className="mt-8">  
        <h2 className="text-xl font-semibold mb-4">Penerima per Program</h2>  
        <div className="h-[300px]">  
          <ResponsiveContainer width="100%" height="100%">  
            <BarChart data={getPenerimaChartData()}>  
              <CartesianGrid strokeDasharray="3 3" />  
              <XAxis dataKey="_id" />  
              <YAxis />  
              <Tooltip />  
              <Bar dataKey="total_penerima" fill="#8884d8" />  
            </BarChart>  
          </ResponsiveContainer>  
        </div>  
      </div>  

      <div className="mt-8">  
        <h2 className="text-xl font-semibold mb-4">Penyaluran per Wilayah</h2>  
        <div className="h-[300px]">  
          <ResponsiveContainer width="100%" height="100%">  
            <BarChart data={getPenyaluranChartData()}>  
              <CartesianGrid strokeDasharray="3 3" />  
              <XAxis dataKey="_id" />  
              <YAxis />  
              <Tooltip />  
              <Bar dataKey="total_penyaluran" fill="#82ca9d" />  
            </BarChart>  
          </ResponsiveContainer>  
        </div>  
      </div>  
    </div>  
  )  
}