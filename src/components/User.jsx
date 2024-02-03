import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import userService from '../services/users'

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserById = async (id) => {
      const singleUser = await userService.getUserById(id)
      console.log(singleUser)
      setUser(singleUser)
    }

    fetchUserById(id)
  },[id])

  if(!user) {
    return <div className='ml-4'>Loading...</div>
  }

  return (
    <div className='flex flex-col ml-5 mt-4'>
      <h2 className='text-2xl font-semibold'>{user.name}</h2>
      <p className='font-semibold mt-3 mb-4'>added blogs</p>
      <ul className='flex flex-col list-disc'>
        {user.blogs.map((item) => (
          <li key={item.id} className='ml-6'><i>{item.title}</i></li>
        ))}
      </ul>
    </div>
  )
}

export default User