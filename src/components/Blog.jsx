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
      console.log('Response from server:', updatedBlog)
      dispatch(updateBlog(updatedBlog.id, updatedBlog))

    } catch (error) {
      console.log('Error updating likes:', error)
    }
  }

  const handleDelete = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(showNotification(`Deleted blog: ${blog.title}`, 3))
      } catch(error) {
        console.log('Error deleting blog:', error)
      }
    }
  }

  useEffect(() => {
    const fetchBlogById = async (id) => {
      const blog = await blogService.getBlogById(id)
      console.log(blog);
      setBlog(blog)
    }

    fetchBlogById(id)
  },[id])

  if (!blog) {
    return null;
  }

  return (
    <div className="p-2 pl-1 border border-solid m-2">
          <h2>{blog.title}</h2>
          <p>{blog.url}</p>
          <p>{blog.likes}<button id='like-button' className="px-2 py-1 bg-slate-200 rounded-md" onClick={handleLikes}>like</button> </p>
          {blog.user && <p>Added by: {blog.user.name}</p>}

          <CommentForm />
          <CommentList />

          {/* delete button is shown only to the user who has added the blog post */}
          {user && blog.user && user.username === blog.user.username && (
            <button className='px-1 py-1 mt-2 bg-blue-500 rounded-md' onClick={handleDelete}>remove</button>
          )}
    </div>

  )
}

export default Blog