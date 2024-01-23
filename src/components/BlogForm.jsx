import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (e) => {
    e.preventDefault()

    if(!newBlog.title || !newBlog.author || !newBlog.url) {
      return;
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
    <div>
      <h2>Create a new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title :</Form.Label>     
          <Form.Control id='title' name="title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Author :</Form.Label>
          <Form.Control id='author' name="author" value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} />
        </Form.Group>

        <Form.Group>
          <Form.Label>URL :</Form.Label>
          <Form.Control id='url' name="url" value={newBlog.url} onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })} />
        </Form.Group>

        <Button variant='primary' type="submit" className=' bg-blue-600 m-2' >Save</Button>
      </Form>
    </div>
  )
}

export default BlogForm