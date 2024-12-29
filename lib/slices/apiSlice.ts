import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/lib/store'
import {
    RegisterUserRequest,
    LoginRequest,
    LoginResponse,
    ExportLaporanParams
} from '@/app/types'
import Cookies from 'js-cookie'  


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // Ambil token dari cookies  
            const token = Cookies.get('token')  || (getState() as RootState).auth.token
            
            // Tambahkan token ke header untuk semua request kecuali login dan register  
            if (token) {  
                headers.set('Authorization', `Bearer ${token}`)  
            }  
            
            return headers
        }
    }),
    tagTypes: ['Auth', 'Laporan'],
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
        })
    })
})

// Export hooks untuk digunakan di komponen  
export const {
    useRegisterMutation,
    useLoginMutation,
    useGetLaporanQuery,
    useCreateLaporanMutation,
    useDeleteLaporanMutation,
    useApproveLaporanMutation,
    useRejectLaporanMutation,
    useLazyExportLaporanQuery
} = apiSlice