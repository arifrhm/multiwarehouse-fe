import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    RegisterUserRequest,
    LoginRequest,
    LoginResponse,
    ExportLaporanParams,
    LaporanResponseAPI,
    StatistikResponse,
    LaporanDetail,
    LaporanDetailResponse,
    UpdateLaporanResponse
} from '@/app/types'
import Cookies from 'js-cookie'


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL + '/api',
        prepareHeaders: (headers) => {  
            const token = Cookies.get('token')  
            if (token) {  
                headers.set('Authorization', `Bearer ${token}`)  
            }  
            return headers  
        }
    }),
    tagTypes: ['Auth', 'Laporan', 'Statistik'],
    endpoints: (builder) => ({
        // Endpoint Registrasi  
        register: builder.mutation<{ message: string, userId: string }, RegisterUserRequest>({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['Auth']
        }),

        // Endpoint Login  
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['Auth']
        }),

        // Endpoint untuk mendapatkan list laporan  
        getLaporan: builder.query<LaporanResponseAPI, {
            page?: number,
            limit?: number,
            status?: string
        }>({
            query: (params) => ({
                url: '/laporan/',
                method: 'GET',
                params: params
            }),
            providesTags: ['Laporan']
        }),

        // Query untuk mendapatkan detail laporan  
        getLaporanById: builder.query<LaporanDetail, string>({
            query: (id) => `/laporan/${id}`,
            transformResponse: (response: LaporanDetailResponse) => response.data,
            providesTags: (result, error, id) => [{ type: 'Laporan', id }]
        }),


        // Endpoint Buat Laporan  
        createLaporan: builder.mutation<any, FormData>({
            query: (laporanData) => ({
                url: '/laporan/buat',
                method: 'POST',
                body: laporanData
            }),
            invalidatesTags: ['Laporan']
        }),
        // Endpoint untuk delete laporan  
        deleteLaporan: builder.mutation<any, string>({
            query: (id) => ({
                url: `/laporan/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Laporan']
        }),

        // Endpoint Approve Laporan  
        approveLaporan: builder.mutation<any, { laporanId: string }>({
            query: ({ laporanId }) => ({
                url: `/laporan/approve/${laporanId}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Laporan']
        }),

        // Endpoint Reject Laporan  
        rejectLaporan: builder.mutation<any, { laporanId: string, alasan_penolakan?: string }>({
            query: ({ laporanId, alasan_penolakan }) => ({
                url: `/laporan/reject/${laporanId}`,
                method: 'PUT',
                body: { alasan_penolakan }
            }),
            invalidatesTags: ['Laporan']
        }),

        // Endpoint Export Laporan  
        exportLaporan: builder.query<Blob, ExportLaporanParams>({
            query: ({ format, ...params }) => ({
                url: `/export/laporan/${format}`,
                method: 'GET',
                params: params,
                responseHandler: (response) => response.blob()
            })
        }),

        // Query untuk mendapatkan statistik umum TANPA params  
        getStatistik: builder.query<StatistikResponse, void>({
            query: () => '/statistik/',
            providesTags: ['Statistik']
        }),

        downloadBuktiPenyaluran: builder.mutation<Blob, string>({  
            query: (buktiPenyaluran) => {  
              const token = Cookies.get('token')  
          
              return {  
                url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${buktiPenyaluran}`,  
                method: 'GET',  
                responseType: 'blob', // Pastikan ini blob  
                headers: {  
                  'Authorization': `Bearer ${token}`  
                }  
              }  
            },  
            // Transformasi response tidak diperlukan untuk blob  
            transformErrorResponse: (response, meta) => {  
              // Handle error khusus untuk download  
              if (response.status === 401) {  
                throw new Error('Tidak terautentikasi')  
              }  
              return response  
            }  
          }),

          updateLaporan: builder.mutation<UpdateLaporanResponse, {  
            id: string,   
            data: FormData  
        }>({  
            query: ({ id, data }) => {  
                // Log data yang akan dikirim  
                console.log('Update Laporan Request:', {  
                    url: `/laporan/${id}`,  
                    method: 'PUT',  
                    body: Object.fromEntries(data)  
                })  
        
                return {  
                    url: `/laporan/${id}`,  
                    method: 'PUT',  
                    body: data,  
                }  
            },  
            invalidatesTags: ['Laporan'],  
            transformErrorResponse: (response: any) => {  
                // Log error secara detail  
                console.error('Update Laporan Error:', {  
                    status: response.status,  
                    data: response.data,  
                    headers: response.headers  
                })  
        
                return {  
                    status: response.status,  
                    message: response.data?.message || 'Gagal mengupdate laporan'  
                }  
            }  
        }),


    }),
})

// Export hooks untuk digunakan di komponen  
export const {
    useRegisterMutation,
    useLoginMutation,
    useGetLaporanQuery,
    useGetLaporanByIdQuery,
    useCreateLaporanMutation,
    useDeleteLaporanMutation,
    useApproveLaporanMutation,
    useRejectLaporanMutation,
    useLazyExportLaporanQuery,
    useGetStatistikQuery,
    useLazyGetStatistikQuery,
    // useDownloadBuktiPenyaluranMutation,
    useDownloadBuktiPenyaluranMutation,
    useUpdateLaporanMutation
} = apiSlice
