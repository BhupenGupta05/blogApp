const express = require('express')
const middleware = require('../utils/middleware.js')
const blogsRouter = express.Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
  .populate('comments', {text: 1})
  .then(blog => {
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if(!body.title || !body.url) {
    return response.status(400).json({ error : 'Bad request' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id', middleware.userExtractor, async (request, response) => {
  try {
    const {id} = request.params
  const {text} = request.body

  if(!text) {
    return;
  }

  const blog = await Blog.findById(id)

  blog.comments.push({text})

  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog.comments)

  } catch(error) {
    response.status(400).json({error : 'Bad request'})
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const { id } = request.params

  const updatedBlog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true, runValidators: true })  // Using $set to only update the 'likes' field

  if(!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { id } = request.params
  const user = request.user

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if(blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: 'Unauthorized to delete this blog' })
  }

  await Blog.deleteOne({ _id: blog })

  user.blogs = user.blogs.filter((userBlogId) => userBlogId.toString() !== id.toString())
  await user.save()

  response.status(204).end()
})

module.exports = blogsRouter