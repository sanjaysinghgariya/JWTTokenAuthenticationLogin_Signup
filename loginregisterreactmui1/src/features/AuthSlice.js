import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  access_token: null,
}

export const AuthSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
    setUserToken:(state, action)=>{
        state.access_token = action.payload.access_token
    },
    unSetUserToken:(state, action)=>{
        state.access_token = action.payload.access_token
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setUserToken, unSetUserToken  } = AuthSlice.actions

export default AuthSlice.reducer