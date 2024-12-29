'use client'  

import { useState } from 'react'  
import { Button } from '@/components/ui/button'  
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'  
import {   
  useGetLaporanQuery,   
  useDeleteLaporanMutation,  
} from '@/lib/slices/apiSlice'  
import { LaporanAPI } from '@/app/types'  
import { showSuccessToast, showErrorToast } from '@/lib/utils/toast'  
import { formatDate } from '@/lib/utils/date'  

export default function LaporanPage() {  
  const [page, setPage] = useState(1)  
  const [status, setStatus] = useState<string | undefined>(undefined)  

  // Query untuk mendapatkan laporan  
  const {   
    data: laporanResponse,   
    isLoading,   
    isError,   
    error   
  } = useGetLaporanQuery({ page, status })  

  // Mutation untuk menghapus laporan  
  const [deleteLaporan, { isLoading: isDeleting }] = useDeleteLaporanMutation()  

  // Handler untuk menghapus laporan  
  const handleDelete = async (id: string) => {  
    try {  
      await deleteLaporan(id).unwrap()  
      showSuccessToast('Laporan berhasil dihapus')  
    } catch (err) {  
      showErrorToast('Gagal menghapus laporan')  
    }  
  }  

  // Handler untuk filter status  
  const handleStatusFilter = (selectedStatus?: string) => {  
    setStatus(selectedStatus)  
  }  

  // Render loading state  
  if (isLoading) return <div>Loading laporan...</div>  

  // Render error state  
  if (isError) return <div>Error: {error?.toString()}</div>  

  return (  
    <div className="p-4">  
      <h1 className="text-2xl font-bold mb-4">Daftar Laporan</h1>  

      {/* Filter Status */}  
      <div className="mb-4 flex space-x-2">  
        <Button   
          variant={status === undefined ? 'default' : 'outline'}  
          onClick={() => handleStatusFilter(undefined)}  
        >  
          Semua  
        </Button>  
        <Button   
          variant={status === 'Pending' ? 'default' : 'outline'}  
          onClick={() => handleStatusFilter('Pending')}  
        >  
          Pending  
        </Button>  
        <Button   
          variant={status === 'Disetujui' ? 'default' : 'outline'}  
          onClick={() => handleStatusFilter('Disetujui')}  
        >  
          Disetujui  
        </Button>  
        <Button   
          variant={status === 'Ditolak' ? 'default' : 'outline'}  
          onClick={() => handleStatusFilter('Ditolak')}  
        >  
          Ditolak  
        </Button>  
      </div>  

      <Table>  
        <TableHeader>  
          <TableRow>  
            <TableHead>Program</TableHead>  
            <TableHead>Jumlah Penerima</TableHead>  
            <TableHead>Tanggal Penyaluran</TableHead>  
            <TableHead>Status</TableHead>  
            <TableHead>Aksi</TableHead>  
          </TableRow>  
        </TableHeader>  
        <TableBody>  
          {laporanResponse?.data.map((laporan: LaporanAPI) => (  
            <TableRow key={laporan._id}>  
              <TableCell>{laporan.nama_program}</TableCell>  
              <TableCell>{laporan.jumlah_penerima}</TableCell>  
              <TableCell>  
                {formatDate(laporan.tanggal_penyaluran)}  
              </TableCell>  
              <TableCell>{laporan.status}</TableCell>  
              <TableCell>  
                <Button   
                  variant="destructive"   
                  onClick={() => handleDelete(laporan._id)}  
                  disabled={isDeleting}  
                >  
                  Hapus  
                </Button>  
              </TableCell>  
            </TableRow>  
          ))}  
        </TableBody>  
      </Table>  

      {/* Pagination */}  
      <div className="flex justify-between mt-4">  
        <Button   
          disabled={page === 1}  
          onClick={() => setPage(p => p - 1)}  
        >  
          Sebelumnya  
        </Button>  
        <span>  
          Halaman {laporanResponse?.pagination.currentPage} dari {laporanResponse?.pagination.totalPages}  
        </span>  
        <Button   
          disabled={page === laporanResponse?.pagination.totalPages}  
          onClick={() => setPage(p => p + 1)}  
        >  
          Selanjutnya  
        </Button>  
      </div>  
    </div>  
  )  
}  