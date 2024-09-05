import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSigned(state, action) {
      state.user = action.payload
    },
    userSignout: (state)=>{
        state.user = null;
    }
  },
})


export const { 
    userSigned, 
    userSignout
} = userSlice.actions

export default userSlice.reducer