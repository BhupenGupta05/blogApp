import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (e) => {
    e.preventDefault()

    if(!newBlog.title || !newBlog.author || !newBlog.url) {
      return
    }

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div className='flex flex-col gap-2'>
      <h2 className="text-2xl font-semibold mb-2">Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
                Title :
          <input id='title' name="title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className=" bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"/>
        </div>

        <div>
                Author :
          <input id='author' name="author" value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} className=" bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"/>
        </div>

        <div>
                URL :
          <input id='url' name="url" value={newBlog.url} onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })} className=" bg-slate-300 px-4 py-1 my-1 outline-none rounded-md ml-2"/>
        </div>

        <button type="submit" className="px-4 py-1 bg-blue-500 rounded-md mb-2" >Save</button>
      </form>
    </div>
  )
}

export default BlogForm