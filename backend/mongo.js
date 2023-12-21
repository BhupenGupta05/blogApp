const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

// const password = process.argv[2]

const url =
  'mongodb+srv://bhupengupta05:<password>@cluster-1.aylpoy5.mongodb.net/blog?retryWrites=true&w=majority'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// const blog = new Blog({
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
// })

// blog.save().then(result => {
//   console.log('blog saved!')
//   mongoose.connection.close()
// })

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})