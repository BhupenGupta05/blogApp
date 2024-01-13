import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state) {
            return []
        }
    }
})

export const {setUser, clearUser} = userSlice.actions

export default userSlice.reducer