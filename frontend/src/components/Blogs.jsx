import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoremPicsum } from 'react-lorem-picsum';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  if (!blogs) {
    return <div className='ml-4'>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8">
      {blogs.map((blog, index) => (
        <div
          key={blog._id || index}
          className="relative rounded-md overflow-hidden bg-white shadow-md group transition-transform transform hover:shadow-lg"
        >
          <div className="h-48 overflow-hidden">
            <LoremPicsum width={400} height={200} className="object-cover w-full h-full hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Blog Title and Author */}
          <div className="p-4">
            <h3 className="font-semibold text-xl text-gray-800 hover:text-blue-500 transition-colors duration-300">
              {blog.title}
            </h3>
            <p className="text-gray-600">{blog.author}</p>
          </div>

          {/* Details Button */}
          <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to={`/blogs/${blog.id}`}>
              <button className="text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 transition-colors duration-300">
                Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
