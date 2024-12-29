export interface Report {
  id: number
  program: string
  recipients: number
  province: string
  district: string
  subdistrict: string
  distributionDate: string
  proof: File | null
  notes?: string
  status: 'Pending' | 'Disetujui' | 'Ditolak'
}

