import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = () => {
  const [blog, setBlog] = useState(null)
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLikes = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      dispatch(updateBlog(updatedBlog.id, updatedBlog))
      setBlog(updatedBlog)
    } catch (error) {
      console.log('Error updating likes:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(showNotification(`Deleted blog: ${blog.title}`, 3))
      } catch (error) {
        console.log('Error deleting blog:', error)
      }
    }
  }

  useEffect(() => {
    const fetchBlogById = async (id) => {
      const blog = await blogService.getBlogById(id)
      setBlog(blog)
    }

    fetchBlogById(id)
  }, [id])

  if (!blog) {
    return <div className='ml-4'>Loading...</div>
  }

  return (
    <div className="flex flex-col mx-8 sm:mx-16 lg:mx-72 mt-4">
      <h2 className='text-3xl font-semibold tracking-wide mt-2'>{blog.title} {blog.author}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-4">{blog.url}</a>
      <p>{`${blog.likes} ${blog.likes === 1 ? 'like' : 'likes'}`} <button id='like-button' className="px-2 py-1 bg-pink-300 rounded-md mt-2 hover:bg-pink-500 transition-colors duration-300" onClick={handleLikes}>like</button></p>
      {blog.user && <p>Added by: {blog.user.name}</p>}

      {/* delete button is shown only to the user who has added the blog post */}
      {user && blog.user && user.username === blog.user.username && (
        <button className='px-2 py-1 mt-2 bg-slate-400 rounded-md w-fit hover:bg-slate-600 transition-colors duration-300' onClick={handleDelete}>Remove</button>
      )}

      <CommentForm />
      <CommentList />
    </div>
  )
}

export default Blog
