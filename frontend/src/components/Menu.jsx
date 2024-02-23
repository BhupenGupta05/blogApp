import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { clearUser } from '../reducers/userReducer'
import { FiMenu, FiX } from 'react-icons/fi'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser())
    blogService.setToken(null)
    setShowMenu(false) // Close the menu after logout
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="relative">
      <nav className="flex items-center justify-around bg-transparent min-h-[8vh] p-4">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold">Writopia</Link>
        </div>

        <div className="md:hidden">
          {showMenu ? (
            <FiX size={24} onClick={toggleMenu} className="cursor-pointer" />
          ) : (
            <FiMenu size={24} onClick={toggleMenu} className="cursor-pointer" />
          )}
        </div>

        <div className={`md:flex ${showMenu ? 'flex-col absolute top-16 left-0 bg-white bg-opacity-80 w-full' : 'hidden'} items-center gap-8`}>
          <Link to="/" className="block px-4 py-2 hover:bg-gray-200 transition duration-200" onClick={() => setShowMenu(false)}>Home</Link>
          <Link to="/blogs" className="block px-4 py-2 hover:bg-gray-200 transition duration-200" onClick={() => setShowMenu(false)}>Blogs</Link>
          <Link to="/users" className="block px-4 py-2 hover:bg-gray-200 transition duration-200" onClick={() => setShowMenu(false)}>Users</Link>
          {user ? (
            <p className="block px-4 py-2"><strong>{user.name}</strong> logged in <button type="submit" className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300 transition-opacity duration-200 opacity-80" onClick={handleLogout}>Logout</button></p>
          ) : (
            <Link to="/login" className="block px-4 py-2 hover:bg-gray-200 transition duration-200" onClick={() => setShowMenu(false)}>Login</Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Menu
