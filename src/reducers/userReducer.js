<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
=======
import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: null,
>>>>>>> 6eaa59d30e8109b6cf49dcb5eee1f8bd5e91f013
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state) {
<<<<<<< HEAD
            return []
=======
            return null
>>>>>>> 6eaa59d30e8109b6cf49dcb5eee1f8bd5e91f013
        }
    }
})

<<<<<<< HEAD
export const {setUser, clearUser} = userSlice.actions
=======
export const { setUser, clearUser } = userSlice.actions
>>>>>>> 6eaa59d30e8109b6cf49dcb5eee1f8bd5e91f013

export default userSlice.reducer