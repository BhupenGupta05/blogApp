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
        <div className="flex">
          <Link style={padding} to='/'></Link>
          <Link style={padding} to='/blogs'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
          <p>{user.name} logged in <button type="submit" className="px-4 py-1 bg-slate-200 rounded-md" onClick={handleLogout}>logout</button> </p>

        </div>
      ) : (
        <div>
          <Link style={padding} to='/'></Link>
          <Link style={padding} to='/blogs'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
          <Link style={padding} to='/login'>login</Link>
        </div>

      )}

    </>
  )
}

export default Menu