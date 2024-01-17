import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsWithUser = blogs.filter(blog => blog.user)

  const uniqueUsers = Array.from(
      new Map(blogsWithUser.map((blog) => [blog.user.id, blog.user]))
      .values())
      .map((user) => ({...user, blogCount: blogsWithUser.filter((blog) => blog.user.id === user.id).length}))
  

  return (
    <div>
      <h2>Users</h2>
      {uniqueUsers.map((user) => (
        <div className="flex" key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        <p> - {user.blogCount} {user.blogCount === 1 ? 'blog' : 'blogs'}</p>
        </div>
        
      ))}
    </div>
  )
}

export default Users