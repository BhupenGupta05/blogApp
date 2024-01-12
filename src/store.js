import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import userReducer from './reducers/userReducer.js'

const store = configureStore({
    reducer: {
      notification: notificationReducer,
      user: userReducer
    }
})

// store.subscribe(() => {
//   const currentState = store.getState()
//   console.log('Current State:', currentState)
// })

export default store