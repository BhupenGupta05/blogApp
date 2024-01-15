import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {

  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    if(user) {
      // Fetch and update blogs after user login
      updateBlogs()
    }
  },[user, username, password])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      // Update blogs after login
      dispatch(showNotification(`${user.name} logged in`, 5))
      updateBlogs()
    } catch (exception) {
      dispatch(showNotification('Wrong credentials', 5))
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }



  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        dispatch(showNotification(`A new blog ${blogObj.title} by ${blogObj.author} added`, 5))
      })
  }





  // Suppose there are two blogs with same no. of likes, and i update the likes of one of them,
  // then the blogs should be sorted in real time instead of the next re-render
  const updateBlogs = async() => {
    try
    {
      const fetchedBlogs = await blogService.getAll()

      // Sort blogs by likes
      const sortedBlogs = fetchedBlogs.slice().sort((a, b) => b.likes - a.likes)
      console.log('Fetching blogs...', sortedBlogs)
      setBlogs(sortedBlogs)
    } catch (error) {
      console.error('Error fetching blogs:', error.message)
      dispatch(showNotification('Failed to fetch blogs. Please try again later.', 5))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm handleSubmit={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}/>
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef} >
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <h2 className="text-4xl font-semibold my-2 mx-4 mb-4">Blogs</h2>
      <Notification />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button type="submit" className="px-4 py-1 bg-slate-200 rounded-md" onClick={handleLogout}>logout</button> </p>
        {blogForm()}
      </div>
      }

      {/* If we dont define a buttonlabel, it will render a button with no text
    <Togglable>buttonLabel forgotten... </Togglable>  */}

      <ul className="mx-2">
        {user && blogs.map((blog, index) => (
          <Blog key={blog._id || index} user={user} blog={blog} updateBlogs={updateBlogs} />
        ))}
      </ul>

    </div>
  )
}

export default App