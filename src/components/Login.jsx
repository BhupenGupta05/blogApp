import LoginForm from "./LoginForm"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { showNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { initializeBlogs } from "../reducers/blogReducer"
import { useNavigate } from "react-router"
import { setUser } from '../reducers/userReducer'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const naviagte = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({ username, password })
          window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
          blogService.setToken(user.token)
          dispatch(setUser(user))
          setUsername('')
          setPassword('')
          dispatch(showNotification(`${user.name} logged in`, 5))
          dispatch(initializeBlogs())
          naviagte('/') 
        } catch (exception) {
          dispatch(showNotification(`Wrong credentials`, 5))
          setUsername('')
          setPassword('')
        }
      }
  return (
    // <Togglable buttonLabel='Login'>
        <LoginForm handleSubmit={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}/>
    // </Togglable>
  )
}

export default Login