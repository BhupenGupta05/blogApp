import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

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
    <h2>Blogs</h2>
    <Table striped>
      <tbody>
      {blogs.map((blog, index) => (
        <tr key={blog._id || index}>
          <td>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}  
            </Link>
          </td>
          <td>
            {blog.author}
          </td>
        </tr>
        ))}
      </tbody>
        
    </Table>
    </>
    
  )
}

export default Blogs