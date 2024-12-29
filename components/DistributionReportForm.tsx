'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Report } from '../types'

type FormData = Omit<Report, 'id' | 'status'>

const programs = ['PKH', 'BLT', 'Bansos']
const provinces = ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']
const districts: Record<string, string[]> = {
  'Jawa Barat': ['Bandung', 'Bogor', 'Bekasi'],
  'Jawa Tengah': ['Semarang', 'Surakarta', 'Pekalongan'],
  'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo'],
}
const subdistricts: Record<string, string[]> = {
  'Bandung': ['Cicendo', 'Coblong', 'Sukajadi'],
  'Bogor': ['Bogor Utara', 'Bogor Selatan', 'Bogor Tengah'],
  // Add more as needed
}

export function DistributionReportForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [subdistrict, setSubdistrict] = useState('')

  const onSubmitForm = (data: FormData) => {
    onSubmit({
      ...data,
      province,
      district,
      subdistrict,
    })
    reset()
    setProvince('')
    setDistrict('')
    setSubdistrict('')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 mb-8">
      <div>
        <Label htmlFor="program">Nama Program</Label>
        <Controller
          name="program"
          control={control}
          rules={{ required: "Program wajib dipilih" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>{program}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.program && <span className="text-red-500">{errors.program.message}</span>}
      </div>

      <div>
        <Label htmlFor="recipients">Jumlah Penerima Bantuan</Label>
        <Input 
          type="number" 
          {...register('recipients', { required: "Jumlah penerima wajib diisi", min: { value: 1, message: "Jumlah penerima minimal 1" } })} 
        />
        {errors.recipients && <span className="text-red-500">{errors.recipients.message}</span>}
      </div>

      <div>
        <Label htmlFor="province">Provinsi</Label>
        <Controller
          name="province"
          control={control}
          rules={{ required: "Provinsi wajib dipilih" }}
          render={({ field }) => (
            <Select 
              onValueChange={(value) => {
                setProvince(value)
                setDistrict('')
                setSubdistrict('')
                field.onChange(value)
              }} 
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih provinsi" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((prov) => (
                  <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.province && <span className="text-red-500">{errors.province.message}</span>}
      </div>

      <div>
        <Label htmlFor="district">Kabupaten</Label>
        <Controller
          name="district"
          control={control}
          rules={{ required: "Kabupaten wajib dipilih" }}
          render={({ field }) => (
            <Select 
              onValueChange={(value) => {
                setDistrict(value)
                setSubdistrict('')
                field.onChange(value)
              }} 
              value={field.value}
              disabled={!province}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kabupaten" />
              </SelectTrigger>
              <SelectContent>
                {districts[province]?.map((dist) => (
                  <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.district && <span className="text-red-500">{errors.district.message}</span>}
      </div>

      <div>
        <Label htmlFor="subdistrict">Kecamatan</Label>
        <Controller
          name="subdistrict"
          control={control}
          rules={{ required: "Kecamatan wajib dipilih" }}
          render={({ field }) => (
            <Select 
              onValueChange={(value) => {
                setSubdistrict(value)
                field.onChange(value)
              }} 
              value={field.value}
              disabled={!district}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kecamatan" />
              </SelectTrigger>
              <SelectContent>
                {subdistricts[district]?.map((subdist) => (
                  <SelectItem key={subdist} value={subdist}>{subdist}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.subdistrict && <span className="text-red-500">{errors.subdistrict.message}</span>}
      </div>

      <div>
        <Label htmlFor="distributionDate">Tanggal Penyaluran</Label>
        <Input 
          type="date" 
          {...register('distributionDate', { required: "Tanggal penyaluran wajib diisi" })} 
        />
        {errors.distributionDate && <span className="text-red-500">{errors.distributionDate.message}</span>}
      </div>

      <div>
        <Label htmlFor="proof">Bukti Penyaluran</Label>
        <Input 
          type="file" 
          accept=".jpg,.png,.pdf" 
          {...register('proof', { 
            required: "Bukti penyaluran wajib diupload",
            validate: (value) => {
              if (value[0]) {
                const fileSize = value[0].size / 1024 / 1024 // in MB
                return fileSize <= 2 || "Ukuran file maksimal 2MB"
              }
              return true
            }
          })} 
        />
        {errors.proof && <span className="text-red-500">{errors.proof.message}</span>}
      </div>

      <div>
        <Label htmlFor="notes">Catatan Tambahan</Label>
        <Textarea {...register('notes')} />
      </div>

      <Button type="submit">Submit Laporan</Button>
    </form>
  )
}

