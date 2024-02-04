import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  if(!blogs) {
    return <div className='ml-4'>Loading...</div>
  }

  return (
    <>
      <h2 className="text-3xl font-semibold my-2 mx-4 mb-4">Blogs</h2>
      <ul className="flex flex-col mx-2 gap-3 list-disc">
        {blogs.map((blog, index) => (
          <Link to={`/blogs/${blog.id}`} key={blog._id || index} >
            <li className=' ml-6'>
              <i className=' font-semibold'>{blog.title}</i>
              {' '}
              {blog.author}
            </li>
          </Link>
        ))}
      </ul>
    </>

  )
}

export default Blogs