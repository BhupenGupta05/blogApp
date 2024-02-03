import { Link } from 'react-router-dom'
import userService from '../services/users'
import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await userService.getUsers()
      console.log(userData)
      setUsers(userData)
    }

    fetchUsers()
  },[])

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div className="flex" key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
          <p> - {user.blogs.length} {user.blogs.length === 1 ? 'blog' : 'blogs'}</p>
        </div>

      ))}
    </div>
  )
}

export default Users