import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import userService from '../services/users'

const User = () => {
    const id = useParams().id
    const [user, setUser] = useState(null)

    useEffect(() => {
      const fetchUserById = async (id) => {
        const singleUser = await userService.getUserById(id)
        console.log(singleUser);
        setUser(singleUser)
      }
  
      fetchUserById(id)
    },[id])

    if(!user) {
      return null;
    }
  
  return (
    <div>
        <p>added blogs</p>
        <ul>
            {user.blogs.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    </div>
  )
}

export default User