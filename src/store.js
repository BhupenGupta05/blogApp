import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import userReducer from './reducers/userReducer.js'
<<<<<<< HEAD
import blogReducer from './reducers/blogReducer.js'
=======
>>>>>>> 6eaa59d30e8109b6cf49dcb5eee1f8bd5e91f013

const store = configureStore({
    reducer: {
      notification: notificationReducer,
<<<<<<< HEAD
      user: userReducer,
      blogs: blogReducer
=======
      user: userReducer
>>>>>>> 6eaa59d30e8109b6cf49dcb5eee1f8bd5e91f013
    }
})

// store.subscribe(() => {
//   const currentState = store.getState()
//   console.log('Current State:', currentState)
// })

export default store