import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import userReducer from './reducers/userReducer.js'
import blogReducer from './reducers/blogReducer.js'
import commentReducer from './reducers/commentReducer.js'

const store = configureStore({
    reducer: {
      notification: notificationReducer,
      user: userReducer,
      blogs: blogReducer,
      comments: commentReducer
    }
})

export default store