import { LoginResponse } from '@/app/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'  

interface AuthState {  
  user: {  
    userId?: string  
  } | null  
  token: string | null  
}  

const initialState: AuthState = {  
  user: null,  
  token: null  
}  

const authSlice = createSlice({  
  name: 'auth',  
  initialState,  
  reducers: {  
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {  
      state.user = { userId: action.payload.userId }  
      state.token = action.payload.token  
    },  
    logout: (state) => {  
      state.user = null  
      state.token = null  
    }  
  }  
})  

export const { setCredentials, logout } = authSlice.actions  
export default authSlice.reducer 