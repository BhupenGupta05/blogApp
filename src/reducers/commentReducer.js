import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { setComments, appendComment } = commentSlice.actions

export const addComment = (id, comment) => {
  return async dispatch => {
    const newComment = await blogService.createComment(id, { text: comment })
    console.log('fetching comments ',newComment)
    dispatch(appendComment(newComment))
    dispatch(fetchComments(id))
  }
}

export const fetchComments = (id) => {
  return async dispatch => {
    const blog = await blogService.getCommentsByBlogId(id)
    console.log('fetching blog ',blog)
    dispatch(setComments(blog.comments))
  }
}

export default commentSlice.reducer