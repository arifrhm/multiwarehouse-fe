'use client'  

import { useState, useEffect } from 'react'  
import {   
  Dialog,   
  DialogContent,   
  DialogHeader,   
  DialogTitle,   
  DialogFooter,  
  DialogDescription   
} from '@/components/ui/dialog'  
import { Button } from '@/components/ui/button'  
import { Input } from '@/components/ui/input'  
import { Label } from '@/components/ui/label'  
import { Textarea } from '@/components/ui/textarea'  
import {   
  Select,   
  SelectContent,   
  SelectItem,   
  SelectTrigger,   
  SelectValue   
} from '@/components/ui/select'  
import {   
  useGetLaporanByIdQuery,   
  useUpdateLaporanMutation   
} from '@/lib/slices/apiSlice'  
import { LaporanDetail, LaporanDetailResponse } from '@/types'  
import { toast } from 'sonner'  
import { Loader2, FileImage, X } from 'lucide-react'  

interface EditReportModalProps {  
  laporanId: string  
  onClose: () => void  
}  

export function EditReportModal({   
  laporanId,   
  onClose   
}: EditReportModalProps) {  
  // Query detail laporan  
  const {   
    data: laporanResponse,   
    isLoading: isLoadingLaporan,  
    error: laporanError  
  } = useGetLaporanByIdQuery(laporanId)  

  // Mutation update laporan  
  const [updateLaporan, { isLoading: isUpdating }] = useUpdateLaporanMutation()  

  // State untuk form  
  const [formData, setFormData] = useState<Partial<LaporanDetail>>({})  
  const [proofFile, setProofFile] = useState<File | null>(null)  
  const [proofPreview, setProofPreview] = useState<string | null>(null)  

  // Inisialisasi form saat data laporan tersedia  
  useEffect(() => {  
    if (laporanResponse && 'status' in laporanResponse) {  
      const laporan = (laporanResponse as LaporanDetailResponse)  
      setFormData({  
        nama_program: laporan.nama_program,  
        jumlah_penerima: laporan.jumlah_penerima,  
        tanggal_penyaluran: formatTanggal(laporan.tanggal_penyaluran),  
        catatan_admin: laporan.catatan_admin || '',  
        wilayah: laporan.wilayah  
      })  
    }  
  }, [laporanResponse])  

  // Fungsi format tanggal  
  const formatTanggal = (tanggal: string): string => {  
    try {  
      return new Date(tanggal).toISOString().split('T')[0]  
    } catch {  
      return ''  
    }  
  }  

  // Handle perubahan file bukti  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const file = e.target.files?.[0]  
    if (file) {  
      // Validasi ukuran file (maks 5MB)  
      if (file.size > 5 * 1024 * 1024) {  
        toast.error('Ukuran file maksimal 5MB')  
        return  
      }  

      // Validasi tipe file  
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']  
      if (!allowedTypes.includes(file.type)) {  
        toast.error('Hanya file JPG, JPEG, PNG, atau PDF yang diizinkan')  
        return  
      }  

      setProofFile(file)  
      
      // Preview file  
      const reader = new FileReader()  
      reader.onloadend = () => {  
        setProofPreview(reader.result as string)  
      }  
      reader.readAsDataURL(file)  
    }  
  }  

  // Hapus file preview  
  const handleRemoveFile = () => {  
    setProofFile(null)  
    setProofPreview(null)  
  }  

  // Validasi form sebelum submit  
  const validateForm = () => {  
    const errors: string[] = []  

    if (!formData.nama_program) {  
      errors.push('Program harus dipilih')  
    }  

    if (!formData.jumlah_penerima || formData.jumlah_penerima <= 0) {  
      errors.push('Jumlah penerima harus lebih dari 0')  
    }  

    if (!formData.tanggal_penyaluran) {  
      errors.push('Tanggal penyaluran harus diisi')  
    }  

    if (errors.length > 0) {  
      errors.forEach(error => toast.error(error))  
      return false  
    }  

    return true  
  }  

  // Handler update  
  const handleUpdate = async () => {  
    // Validasi form  
    if (!validateForm()) return  

    try {  
      // Persiapkan form data  
      const updateData = new FormData()  
      
      // Tambahkan field teks  
      Object.keys(formData).forEach(key => {  
        const value = formData[key as keyof LaporanDetail]  
        if (value !== undefined) {  
          if (key === 'wilayah') {  
            // Serialize wilayah  
            updateData.append(key, JSON.stringify(value))  
          } else {  
            updateData.append(key, String(value))  
          }  
        }  
      })  

      // Tambahkan file jika ada  
      if (proofFile) {  
        updateData.append('bukti_penyaluran', proofFile)  
      }  

      // Kirim update  
      const result = await updateLaporan({  
        id: laporanId,  
        data: updateData  
      }).unwrap()  

      toast.success(result.message || 'Laporan berhasil diupdate')  
      onClose()  
    } catch (error: any) {  
      console.error('Update error:', error)  
      toast.error(error.data?.message || 'Gagal mengupdate laporan')  
    }  
  }  

  // Loading state  
  if (isLoadingLaporan) {  
    return (  
      <Dialog open={true} onOpenChange={onClose}>  
        <DialogContent className="flex justify-center items-center">  
          <Loader2 className="animate-spin h-8 w-8" />  
        </DialogContent>  
      </Dialog>  
    )  
  }  

  // Error state  
  if (laporanError) {  
    return (  
      <Dialog open={true} onOpenChange={onClose}>  
        <DialogContent>  
          <DialogHeader>  
            <DialogTitle>Error</DialogTitle>  
            <DialogDescription>  
              Gagal memuat data laporan. Silakan coba lagi.  
            </DialogDescription>  
          </DialogHeader>  
          <DialogFooter>  
            <Button onClick={onClose}>Tutup</Button>  
          </DialogFooter>  
        </DialogContent>  
      </Dialog>  
    )  
  }  
  // Cek apakah laporan dalam status Pending  
  const isEditDisabled = laporanResponse   
  && 'status' in laporanResponse   
  && (laporanResponse as LaporanDetailResponse).status !== 'Pending'
  return (  
    <Dialog open={true} onOpenChange={onClose}>  
      <DialogContent className="sm:max-w-[600px]">  
        <DialogHeader>  
          <DialogTitle>Edit Laporan</DialogTitle>  
          {isEditDisabled && (  
            <DialogDescription className="text-destructive">  
              Laporan tidak dapat diedit karena sudah diproses  
            </DialogDescription>  
          )}  
        </DialogHeader>  

        <div className="grid gap-4">  
          {/* Program */}  
          <div>  
            <Label>Program</Label>  
            <Select  
              value={formData.nama_program}  
              onValueChange={(value) => setFormData(prev => ({   
                ...prev,   
                nama_program: value   
              }))}  
              disabled={isEditDisabled}  
            >  
              <SelectTrigger>  
                <SelectValue placeholder="Pilih Program" />  
              </SelectTrigger>  
              <SelectContent>  
                {['PKH', 'BLT', 'Bansos'].map((program) => (  
                  <SelectItem key={program} value={program}>  
                    {program}  
                  </SelectItem>  
                ))}  
              </SelectContent>  
            </Select>  
          </div>  

          {/* Jumlah Penerima */}  
          <div>  
            <Label>Jumlah Penerima</Label>  
            <Input  
              type="number"  
              min={1}  
              value={formData.jumlah_penerima || ''}  
              onChange={(e) => setFormData(prev => ({   
                ...prev,   
                jumlah_penerima: Number(e.target.value)   
              }))}  
              disabled={isEditDisabled}  
            />  
          </div>  

          {/* Tanggal Penyaluran */}  
          <div>  
            <Label>Tanggal Penyaluran</Label>  
            <Input  
              type="date"  
              value={formData.tanggal_penyaluran || ''}  
              onChange={(e) => setFormData(prev => ({   
                ...prev,   
                tanggal_penyaluran: e.target.value   
              }))}  
              disabled={isEditDisabled}  
              max={new Date().toISOString().split('T')[0]} // Tidak bisa memilih tanggal di masa depan  
            />  
          </div>  

          {/* Bukti Penyaluran */}  
          <div>  
            <Label>Bukti Penyaluran</Label>  
            {laporanResponse && 'data' in laporanResponse && laporanResponse.data.bukti_penyaluran && (  
              <div className="mb-2">  
                <a   
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${laporanResponse.data.bukti_penyaluran}`}   
                  target="_blank"   
                  rel="noopener noreferrer"  
                  className="text-blue-500 hover:underline flex items-center"  
                >  
                  <FileImage className="mr-2 h-4 w-4" />  
                  Lihat Bukti Saat Ini  
                </a>  
              </div>  
            )}  
            {!isEditDisabled && (  
              <div className="relative">  
                <Input  
                  type="file"  
                  accept=".jpg,.jpeg,.png,.pdf"  
                  onChange={handleFileChange}  
                  className="cursor-pointer"  
                />  
                {proofPreview && (  
                  <div className="relative mt-2">  
                    <img   
                      src={proofPreview}   
                      alt="Preview Bukti"   
                      className="max-h-40 object-contain rounded-md"  
                    />  
                    <Button   
                      variant="destructive"   
                      size="icon"   
                      className="absolute top-1 right-1"  
                      onClick={handleRemoveFile}  
                    >  
                      <X className="h-4 w-4" />  
                    </Button>  
                  </div>  
                )}  
              </div>  
            )}  
          </div>  

          {/* Catatan */}  
          <div>  
            <Label>Catatan</Label>  
            <Textarea  
              value={formData.catatan_admin || ''}  
              onChange={(e) => setFormData(prev => ({   
                ...prev,   
                catatan_admin: e.target.value   
              }))}  
              placeholder="Tambahkan catatan tambahan (opsional)"  
              maxLength={500}  
              disabled={isEditDisabled}  
            />  
          </div>  
        </div>  

        <DialogFooter>  
          <Button   
            onClick={handleUpdate}  
            disabled={isUpdating || isEditDisabled}  
          >  
            {isUpdating ? (  
              <>  
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />   
                Menyimpan...  
              </>  
            ) : (  
              'Simpan Perubahan'  
            )}  
          </Button>  
        </DialogFooter>  
      </DialogContent>  
    </Dialog>  
  )  
}