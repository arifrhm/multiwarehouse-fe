import { configureStore } from '@reduxjs/toolkit'  
import { apiSlice } from './slices/apiSlice'  
import authReducer from './slices/authSlice'  
import laporanReducer from './slices/laporanSlice'  

export const store = configureStore({  
  reducer: {  
    [apiSlice.reducerPath]: apiSlice.reducer,  
    auth: authReducer,  
    laporan: laporanReducer  
  },  
  middleware: (getDefaultMiddleware) =>   
    getDefaultMiddleware().concat(apiSlice.middleware)  
})  

export type RootState = ReturnType<typeof store.getState>  
export type AppDispatch = typeof store.dispatch