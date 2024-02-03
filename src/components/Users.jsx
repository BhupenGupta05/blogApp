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
      <h2 className='text-2xl font-semibold ml-5 mt-4 mb-4'>Users</h2>
      <ul className='flex flex-col gap-2 ml-8 mt-2'>
      {users.map((user) => (
        <li className='flex' key={user.id}>
          <Link to={`/users/${user.id}`} className=' font-semibold'>{user.name}</Link>
          <p> - {user.blogs.length} {user.blogs.length === 1 ? 'blog' : 'blogs'}</p>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default Users