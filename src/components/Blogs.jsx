import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogs = useSelector((state) => state.blogs)

  if(!blogs) {
    return null
  }

  return (
    <>
      <h2 className="text-4xl font-semibold my-2 mx-4 mb-4">Blogs</h2>
      <div className="mx-2">
        {blogs.map((blog, index) => (
          <Link to={`/blogs/${blog.id}`} key={blog._id || index} >
            <li style={blogStyle}>
              {blog.title} {' by '} {blog.author}
            </li>
          </Link>
        ))}
      </div>
    </>

  )
}

export default Blogs