import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
    const id = useParams().id
    const blogs = useSelector((state) => state.blogs)
    const blogsWithUser = blogs.filter(blog => blog.user)

    const userWithBlogs = blogsWithUser.filter((blog) => blog.user.id === id)
    console.log((userWithBlogs))
  
  return (
    <div>
        <p>added blogs</p>
        <ul>
            {userWithBlogs.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    </div>
  )
}

export default User