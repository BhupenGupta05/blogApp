import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { clearUser } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser())
    blogService.setToken(null)
  }
  return (
    <>
      {user ? (
        <div className="flex gap-2">
          <Link style={padding} to='/'></Link>
          <Link style={padding} to='/blogs'>Blogs</Link>
          <Link style={padding} to='/users'>Users</Link>
          <p><strong>{user.name}</strong> logged in <button type="submit" className="px-4 py-1 bg-slate-200 rounded-md" onClick={handleLogout}>Logout</button> </p>

        </div>
      ) : (
        <div>
          <Link style={padding} to='/'></Link>
          <Link style={padding} to='/blogs'>Blogs</Link>
          <Link style={padding} to='/users'>Users</Link>
          <Link style={padding} to='/login'>Login</Link>
        </div>

      )}

    </>
  )
}

export default Menu