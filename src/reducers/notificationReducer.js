import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {message: '', displayTime: 0},
    reducers: {
        setNotification(state, action) {
            const {message, displayTime} = action.payload
            return {message, displayTime}
        },
        clearNotification(state) {
            return {message: '', displayTime: 0}
        }
    }
})

export const {setNotification, clearNotification} = notificationSlice.actions

export const showNotification = (message, displayTime) => {
    return async dispatch => {
        dispatch(setNotification({message, displayTime}))
        
        setTimeout(() => {
            dispatch(clearNotification())
        }, displayTime*1000)
    }
}

export default notificationSlice.reducer