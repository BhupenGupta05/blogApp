import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import { selectUser } from "./userReducer"
import store from '../store'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateLikes(state, action) {
          const { id, likes } = action.payload
          const blogToUpdate = state.find(blog => blog.id === id)
          if (blogToUpdate) {
            blogToUpdate.likes = likes;
          }
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        removeBlog(state, action) {
          const id = action.payload
          return state.filter(blog => blog.id !== id)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { updateLikes, appendBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {  
  return async dispatch => {    
    const blogs = await blogService.getAll()    
    dispatch(setBlogs(blogs))  
  }}


  //here i have to add user object
export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    const user = selectUser(store.getState())
    console.log(user)
    const blogWithUser = {...newBlog, user}
    dispatch(appendBlog(blogWithUser))
  }
}

export const updateBlog = (id, existingBlog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, existingBlog)
    dispatch(updateLikes(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer