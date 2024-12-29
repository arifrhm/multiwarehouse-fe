// types/report.ts atau app/types.ts  

export interface Wilayah {  
  provinsi: string  
  kabupaten: string  
  kecamatan: string  
}  

export interface Report {  
  _id?: string  
  nama_program: string  
  wilayah: Wilayah  
  jumlah_penerima: number | string  
  tanggal_penyaluran: string  
  bukti_penyaluran: File | string  
  catatan?: string  
  status?: 'Pending' | 'Disetujui' | 'Ditolak'  
  createdAt?: string  
  updatedAt?: string  
}
// Untuk form state  
export interface CreateReportForm {  
  nama_program: string  
  wilayah: {  
    provinsi: string  
    kabupaten: string  
    kecamatan: string  
  }  
  jumlah_penerima: number | string  
  tanggal_penyaluran: string  
  bukti_penyaluran: File | null  
  catatan?: string  
}  

// Untuk response dari backend  
export interface ReportResponse extends Report {  
  _id: string  
  createdAt: string  
  updatedAt: string  
} 

export interface RegisterUserRequest {  
  username: string  
  email: string  
  password: string  
  wilayah: Wilayah  
}  

export interface LoginRequest {  
  username: string  
  password: string  
}  

export interface User {  
  id: string  
  username: string  
  email: string  
  role: string  
}  

export interface LoginResponse {  
  token: string  
  refreshToken: string  
  user: User  
}  

export interface LaporanRequest {  
  nama_program: string  
  wilayah: Wilayah  
  jumlah_penerima: string  
  tanggal_penyaluran: string  
  bukti_penyaluran: File  
}  

export interface LaporanActionRequest {  
  alasan_penolakan?: string  
}  

export interface ExportLaporanParams {  
  status?: string  
  start_date?: string  
  end_date?: string  
  search?: string  
  format: 'csv' | 'excel' | 'pdf'  
}
export interface UserInfo {  
  _id: string  
  username: string  
  email: string  
}  
export interface LaporanDetail {  
  id: string  
  nama_program: string  
  wilayah: Wilayah  
  jumlah_penerima: number  
  tanggal_penyaluran: string  
  bukti_penyaluran: string | null  
  status: 'Pending' | 'Disetujui' | 'Ditolak'  
  catatan_admin: string | null  
  userId: string  
  createdAt: string  
  updatedAt: string  
  user: UserInfo  
}  

export interface LaporanDetailResponse {  
  message: string  
  data: LaporanDetail  
}  

export interface LaporanAPI {  
  id: string  
  nama_program: string  
  wilayah: Wilayah  
  jumlah_penerima: number  
  tanggal_penyaluran: string  
  bukti_penyaluran: string  
  status: 'Pending' | 'Disetujui' | 'Ditolak'  
  catatan_admin: string | null  
  userId: string  
  createdAt: string  
  updatedAt: string  
  user: UserInfo  
}  

export interface PaginationInfo {  
  currentPage: number  
  totalPages: number  
  totalDokumen: number  
  dokumenPerHalaman: number  
}  

export interface LaporanResponseAPI {  
  message: string  
  data: LaporanAPI[]  
  pagination: PaginationInfo  
}  

export interface LaporanState {  
  reports: LaporanAPI[]  
  pagination: PaginationInfo  
  loading: boolean  
  error: string | null  
}  

export interface StatistikResponse {  
  total_laporan: number  
  penerima_per_program: Array<{  
    _id: string  
    total_penerima: number  
  }>  
  penyaluran_per_wilayah: Array<{  
    _id: string  
    total_penyaluran: number  
  }>  
} 


export interface UpdateLaporanPayload {  
  nama_program?: string  
  wilayah?: {  
    provinsi?: string  
    kabupaten?: string  
    kecamatan?: string  
  }  
  jumlah_penerima?: number  
  tanggal_penyaluran?: string  
  bukti_penyaluran?: File | null  
  catatan_admin?: string | null  
}  


export interface UpdateLaporanResponse {  
  message: string  
  data: LaporanDetail  
}  