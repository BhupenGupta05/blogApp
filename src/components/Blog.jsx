import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const Blog = () => {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id))

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

  if (!blog) {
    return <div>Loading...</div>;
  }


  return (
    <div>
          <h2>{blog.title}</h2>
          <p>{blog.url}</p>
          <p>{blog.likes}<button id='like-button' onClick={handleLikes}>like</button> </p>
          {blog.user && <p>Added by: {blog.user.name}</p>}

          <CommentForm />
          <CommentList />

          {/* delete button is shown only to the user who has added the blog post */}
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
    </div>

  )
}

export default Blog