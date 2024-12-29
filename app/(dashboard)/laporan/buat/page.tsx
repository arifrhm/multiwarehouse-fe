'use client'  

import { useState } from 'react'  
import { useRouter } from 'next/navigation'  
import { Button } from '@/components/ui/button'  
import { Input } from '@/components/ui/input'  
import { Label } from '@/components/ui/label'  
import { Textarea } from '@/components/ui/textarea'  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'  
import { useCreateLaporanMutation } from '@/lib/slices/apiSlice'  
import { showSuccessToast, showErrorToast } from '@/lib/utils/toast'  
import { Report } from '@/app/types'  

export default function CreateReportPage() {  
  const router = useRouter()  
  const [createReport, { isLoading }] = useCreateLaporanMutation()  

  const [newReport, setNewReport] = useState({  
    nama_program: '',  
    wilayah: {  
      provinsi: '',  
      kabupaten: '',  
      kecamatan: ''  
    },  
    jumlah_penerima: '',  
    tanggal_penyaluran: '',  
    bukti_penyaluran: null as File | null,  
    catatan: ''  
  })  

  const [proofUrl, setProofUrl] = useState<string | null>(null)  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    const { name, value } = e.target  
    setNewReport(prev => ({ ...prev, [name]: value }))  
  }  

  const handleWilayahChange = (field: 'provinsi' | 'kabupaten' | 'kecamatan', value: string) => {  
    setNewReport(prev => ({  
      ...prev,  
      wilayah: {  
        ...prev.wilayah,  
        [field]: value  
      }  
    }))  
  }  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const file = e.target.files?.[0]  
    if (file) {  
      setNewReport(prev => ({ ...prev, bukti_penyaluran: file }))  
      const url = URL.createObjectURL(file)  
      setProofUrl(url)  
    }  
  }  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault()  

    // Validasi form  
    if (!newReport.nama_program) {  
      showErrorToast('Pilih program terlebih dahulu')  
      return  
    }  

    if (!newReport.wilayah.provinsi || !newReport.wilayah.kabupaten || !newReport.wilayah.kecamatan) {  
      showErrorToast('Lengkapi informasi wilayah')  
      return  
    }  

    if (!newReport.jumlah_penerima || parseInt(newReport.jumlah_penerima) <= 0) {  
      showErrorToast('Jumlah penerima harus lebih dari 0')  
      return  
    }  

    if (!newReport.tanggal_penyaluran) {  
      showErrorToast('Tanggal penyaluran harus diisi')  
      return  
    }  

    if (!newReport.bukti_penyaluran) {  
      showErrorToast('Bukti penyaluran harus diunggah')  
      return  
    }  

    try {  
      // Buat FormData untuk mengirim file  
      const formData = new FormData()  
      formData.append('nama_program', newReport.nama_program)  
      
      // Tambahkan wilayah sebagai individual fields  
      formData.append('wilayah[provinsi]', newReport.wilayah.provinsi)  
      formData.append('wilayah[kabupaten]', newReport.wilayah.kabupaten)  
      formData.append('wilayah[kecamatan]', newReport.wilayah.kecamatan)  

      formData.append('jumlah_penerima', newReport.jumlah_penerima)  
      formData.append('tanggal_penyaluran', newReport.tanggal_penyaluran)  
      
      if (newReport.catatan) {  
        formData.append('catatan', newReport.catatan)  
      }  
      
      if (newReport.bukti_penyaluran) {  
        formData.append('bukti_penyaluran', newReport.bukti_penyaluran)  
      }  

      // Kirim laporan  
      const response = await createReport(formData).unwrap()  

      // Tampilkan toast sukses  
      showSuccessToast('Laporan berhasil dibuat')  

      // Redirect ke halaman daftar laporan  
      router.push('/laporan')  
    } catch (error: any) {  
      // Tangani error  
      console.error('Error creating report:', error)  
      showErrorToast(  
        error?.data?.message ||   
        'Gagal membuat laporan. Silakan coba lagi.'  
      )  
    }  
  }  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <h1 className="text-2xl font-bold mb-6">Buat Laporan Baru</h1>  
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">  
        <div className="grid grid-cols-4 items-center gap-4">  
          <Label htmlFor="nama_program" className="text-right">  
            Program  
          </Label>  
          <Select  
            onValueChange={(value) => setNewReport(prev => ({ ...prev, nama_program: value }))}  
            value={newReport.nama_program}  
          >  
            <SelectTrigger className="col-span-3">  
              <SelectValue placeholder="Pilih program" />  
            </SelectTrigger>  
            <SelectContent>  
              {['PKH', 'BLT', 'Bansos'].map((program) => (  
                <SelectItem key={program} value={program}>{program}</SelectItem>  
              ))}  
            </SelectContent>  
          </Select>  
        </div>  
        
        {/* Wilayah dengan 3 input */}  
        <div className="grid grid-cols-4 items-center gap-4">  
          <Label className="text-right">  
            Wilayah  
          </Label>  
          <div className="col-span-3 space-y-2">  
            <Input  
              placeholder="Provinsi"  
              value={newReport.wilayah.provinsi}  
              onChange={(e) => handleWilayahChange('provinsi', e.target.value)}  
              className="w-full"  
            />  
            <Input  
              placeholder="Kabupaten"  
              value={newReport.wilayah.kabupaten}  
              onChange={(e) => handleWilayahChange('kabupaten', e.target.value)}  
              className="w-full"  
            />  
            <Input  
              placeholder="Kecamatan"  
              value={newReport.wilayah.kecamatan}  
              onChange={(e) => handleWilayahChange('kecamatan', e.target.value)}  
              className="w-full"  
            />  
          </div>  
        </div>  

        <div className="grid grid-cols-4 items-center gap-4">  
          <Label htmlFor="jumlah_penerima" className="text-right">  
            Jumlah Penerima  
          </Label>  
          <Input  
            id="jumlah_penerima"  
            name="jumlah_penerima"  
            type="number"
            value={newReport.jumlah_penerima}  
            onChange={handleChange}  
            className="col-span-3"  
          />  
        </div>  
        
        <div className="grid grid-cols-4 items-center gap-4">  
          <Label htmlFor="tanggal_penyaluran" className="text-right">  
            Tanggal Penyaluran  
          </Label>  
          <Input  
            id="tanggal_penyaluran"  
            name="tanggal_penyaluran"  
            type="date"  
            value={newReport.tanggal_penyaluran}  
            onChange={handleChange}  
            className="col-span-3"  
          />  
        </div>  
        
        <div className="grid grid-cols-4 items-center gap-4">  
          <Label htmlFor="bukti_penyaluran" className="text-right">  
            Bukti Penyaluran  
          </Label>  
          <div className="col-span-3">  
            {proofUrl ? (  
              <div className="flex items-center space-x-2">  
                <a   
                  href={proofUrl}   
                  target="_blank"   
                  rel="noopener noreferrer"   
                  className="text-blue-500 hover:underline"  
                >  
                  Lihat Bukti  
                </a>  
                <button   
                  type="button"  
                  onClick={() => {  
                    setNewReport(prev => ({ ...prev, bukti_penyaluran: null }))  
                    setProofUrl(null)  
                  }}  
                  className="text-red-500 text-sm"  
                >  
                  Hapus  
                </button>  
              </div>  
            ) : (  
              <Input  
                id="bukti_penyaluran"  
                name="bukti_penyaluran"  
                type="file"  
                onChange={handleFileChange}  
                accept=".jpg,.jpeg,.png,.pdf"  
              />  
            )}  
          </div>  
        </div>  
        
        <div className="grid grid-cols-4 items-center gap-4">  
          <Label htmlFor="catatan" className="text-right">  
            Catatan  
          </Label>  
          <Textarea  
            id="catatan"  
            name="catatan"  
            value={newReport.catatan}  
            onChange={handleChange}  
            className="col-span-3"  
            placeholder="Tambahkan catatan jika diperlukan"  
          />  
        </div>  
        
        <div className="flex justify-end space-x-4">  
          <Button   
            type="button"   
            variant="outline"  
            onClick={() => router.push('/laporan')}  
          >  
            Batal  
          </Button>  
          <Button   
            type="submit"   
            disabled={isLoading}  
          >  
            {isLoading ? 'Membuat Laporan...' : 'Buat Laporan'}  
          </Button>  
        </div>  
      </form>  
    </div>  
  )  
}