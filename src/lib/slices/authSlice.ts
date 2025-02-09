import { createSlice, PayloadAction } from '@reduxjs/toolkit'  

// Definisikan tipe yang sesuai dengan struktur response  
interface User {  
  id: string  
  username: string  
  email: string  
  role: string  
}  

interface AuthState {  
  token: string | null  
  refreshToken: string | null  
  user: User | null  
}  

const initialState: AuthState = {  
  token: null,  
  refreshToken: null,  
  user: null  
}  

const authSlice = createSlice({  
  name: 'auth',  
  initialState,  
  reducers: {  
    setCredentials: (state, action: PayloadAction<{  
      token: string  
      refreshToken: string  
      user: User  
    }>) => {  
      const { token, refreshToken, user } = action.payload  
      
      state.token = token  
      state.refreshToken = refreshToken  
      state.user = user  

      // Optional: Simpan ke localStorage/sessionStorage jika diperlukan  
      // localStorage.setItem('user', JSON.stringify(user))  
    }, 
    logout: (state) => {  
      state.token = null  
      state.refreshToken = null  
      state.user = null  
      
      // Hapus cookies  
      import('js-cookie').then(Cookies => {  
        Cookies.default.remove('token')  
        Cookies.default.remove('refreshToken')  
      })  
    } 
  }  
})  

export const { setCredentials, logout } = authSlice.actions  
export default authSlice.reducer 