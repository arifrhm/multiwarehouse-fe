import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LaporanState, LaporanAPI, PaginationInfo } from '@/app/types'

const initialState: LaporanState = {
    reports: [],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalDokumen: 0,
        dokumenPerHalaman: 10
    },
    loading: false,
    error: null
}

const laporanSlice = createSlice({
    name: 'laporan',
    initialState,
    reducers: {
        setReports: (state, action: PayloadAction<LaporanAPI[]>) => {
            state.reports = action.payload
        },
        setPagination: (state, action: PayloadAction<PaginationInfo>) => {
            state.pagination = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        }
    }
})

export const {
    setReports,
    setPagination,
    setLoading,
    setError
} = laporanSlice.actions

export default laporanSlice.reducer  