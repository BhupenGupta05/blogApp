import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initializeBlogs,createBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import Menu from './components/Menu'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { Route, Routes, useNavigate, Navigate } from 'react-router'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'

const App = () => {
  const naviagte = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)


  // const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    if(user) {
      // Fetch and update blogs after user login
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
      naviagte('/')
    }
  }, [dispatch])

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const user = await loginService.login({ username, password })
  //     window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  //     blogService.setToken(user.token)
  //     dispatch(setUser(user))
  //     setUsername('')
  //     setPassword('')
  //     // Update blogs after login
  //     dispatch(showNotification(`${user.name} logged in`, 5))
  //     dispatch(initializeBlogs())
  //     naviagte('/')
      
  //   } catch (exception) {
  //     dispatch(showNotification(`Wrong credentials`, 5))
  //     setUsername('')
  //     setPassword('')
  //   }
  // }

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObj))
    dispatch(showNotification(`A new blog ${blogObj.title} by ${blogObj.author} added`, 5))
  }

  // const loginForm = () => (
  //   <Togglable buttonLabel='Login'>
  //     <LoginForm handleSubmit={handleLogin}
  //       username={username}
  //       password={password}
  //       setUsername={setUsername}
  //       setPassword={setPassword}/>
  //   </Togglable>
  // )

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef} >
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <Notification />
      <Menu />

      {/* {!user && loginForm()} */}
      {user && <div>
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

      {/* If we dont define a buttonlabel, it will render a button with no text
    <Togglable>buttonLabel forgotten... </Togglable>  */}

    </div>
  )
}

export default App