import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state) {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const selectUser = (state) => state.user

export default userSlice.reducer