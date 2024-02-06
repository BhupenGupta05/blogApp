import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initializeBlogs,createBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { Route, Routes, Navigate, useLocation } from 'react-router'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Footer from './components/Footer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const blogFormRef = useRef()

  useEffect(() => {
    if(user) {
      dispatch(initializeBlogs())
    }
  },[user, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(localUser))
      blogService.setToken(localUser.token)
      dispatch(initializeBlogs())
    }
    setLoading(false)
  }, [dispatch])

  if(loading) {
    return <div>Loading...</div>
  }

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObj))
    dispatch(showNotification(`A new blog ${blogObj.title} by ${blogObj.author} added`, 5))
  }

  const shouldRenderBlogForm = location.pathname === '/blogs'

  const blogForm = () => (
    <Togglable buttonLabel='Wanna share something...' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div className='flex flex-col min-h-screen'>
      <Notification />
      <Menu />

      {shouldRenderBlogForm
      && user
      &&
      <div className='m-8'>
        {blogForm()}
      </div>
      }

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={user ? <Blogs /> : <Navigate replace to='/login' />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users' element={user ? <Users />: <Navigate replace to='/login' />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      
      <Footer />

    </div>
  )
}

export default App