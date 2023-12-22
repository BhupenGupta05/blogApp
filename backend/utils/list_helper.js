const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ?
    0 :
    blogs.reduce((sum,blog) => sum + blog.likes,0)
}

const favouriteBlog = (blogs) => {
  const favBlog = blogs.reduce((maxBlog,blog) => (blog.likes > maxBlog.likes ?
    blog :
    maxBlog),blogs[0])

  const { _id,__v,...rest } = favBlog
  return rest
}

const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((blogs,author) => ({ author, blogs:blogs.length }))
    .maxBy('blogs')
    .value()
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}