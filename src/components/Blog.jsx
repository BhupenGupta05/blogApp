import blogService from '../services/blogs'
import { useState, useEffect, useReducer } from "react"

const Blog = ({blog, updateBlogs}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes || 0)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLikes = async () => {
    try {
      const updatedBlog = { ...blog, likes: likes + 1 }
      const response = await blogService.update(blog.id, updatedBlog)

      console.log('Response from server:', response)
      setLikes(response.likes)
      // Update the parent component's state to trigger re-render with sorted blogs
      updateBlogs()
    } catch (error) {
      console.log('Error updating likes:', error)
    }
  }

  useEffect(() => {
    // Update likes state when the blog prop changes
    setLikes(blog.likes || 0)
  }, [blog])

  return (
    <div className="p-2 pl-1 border border-solid m-2">
      <div>
        {blog.title} {blog.author} {' '}
        <button onClick={toggleDetails} className="px-4 py-1 bg-slate-200 rounded-md" >{showDetails ? 'hide' : 'view'}</button>
      </div>

      {/* I might face this problem again */}

      {/* Here when I was trying to update the likes when the user clicks on the like button, 
      I was using blog.likes but I already defined a state for that, that's why, 
      it was not getting updated as soon as i click, instead of that it was getting updated after i have refreshed the page */}
      {showDetails && (
      <div>
        <p>{blog.url}</p>
        <p>{likes}<button className="px-2 py-1 bg-slate-200 rounded-md" onClick={handleLikes}>like</button> </p>
        {blog.user && <p>Added by: {blog.user.name}</p>}
      </div>
      )}
    </div>
    
  )
}

export default Blog