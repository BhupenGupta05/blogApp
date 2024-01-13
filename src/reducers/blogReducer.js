import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateLikes(state, action) {
            const updatedBlog = action.payload
            return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
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

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
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