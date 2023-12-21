const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const initialBlogs = [
  {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
  },
  {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
  },
]


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})


describe('POST /api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('create a new user with valid input', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'Test User',
      password: 'testPassword',
    };
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })



  test('should not create a new user with short username', async () => {
    const newUser = {
      username: 'Us',
      password: 'testPassword',
    }
  
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    console.log('Response body:', response.body)
    expect(response.body).toHaveProperty('error', 'Username and password must be at least 3 characters long.')
  })



  test('should not create a new user with a short password', async () => {
    const newUser = {
      username: 'testUser01',
      password: 'Pa',
    }
  
    try {
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  
      console.log('Response body:', response.body)
      expect(response.body).toHaveProperty('error', 'Username and password must be at least 3 characters long.')
    } catch (error) {
      console.error('Error in test:', error)
    }
  })



  test('should not create a user with a non-unique username', async () => {
    const newUser = {
      username: 'testUser',
      password: 'testPassword',
    }
  
    try {
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  
      console.log('Response body:', response.body)
      expect(response.body).toHaveProperty('error', 'Username must be unique.')
    } catch (error) {
      console.error('Error in test:', error)
    }
  })
})

describe('GET /api/blog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  },100000)



  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })



  test('a specific blog within the returned blog', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)  
    expect(contents).toContain('Go To Statement Considered Harmful')
  })



  test('Blog posts have "id" property instead of "_id"', async() => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
  
    expect(response.status).toBe(200)
    expect(blogs).toBeDefined()
  
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined() // Check if "id" property is defined
      expect(blog._id).toBeUndefined() // Check if "_id" property is undefined
    })
  })
})


describe('POST /api/blogs', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: "async/await simplifies making async calls",
      author: "Bhupen Gupta",
      url: "https://reactpatterns.com/",
      likes: 10
    }
  
    const initialCount = await Blog.countDocuments()
  
    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const updatedCount = await Blog.countDocuments()
    expect(updatedCount).toBe(initialCount + 1)

    const savedBlog = response.body
    expect(savedBlog.title).toBe(newBlog.title)
    expect(savedBlog.author).toBe(newBlog.author)
    expect(savedBlog.url).toBe(newBlog.url)
    expect(savedBlog.likes).toBe(newBlog.likes)

    const blogInDb = await Blog.findById(savedBlog.id)
    expect(blogInDb).toBeDefined()
  })



  test('Likes default to 0 if missing from the request', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
    }
  
    const response = await api.post('/api/blogs').send(newBlog)
    const savedBlog = response.body;
  
    expect(response.status).toBe(201)
    expect(savedBlog.likes).toBeDefined()
    expect(savedBlog.likes).toBe(0)
  })



  test('a blog without title or url cannot be added', async() => {
    const newBlog = {
      author: "Test author"
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('DELETE /api/blog/:id', () => {
  test('deletes a blog post by ID', async() => {
    const newBlog = new Blog({
      title: 'Test Blog',
        author: 'Test Author',
        url: 'https://example.com',
        likes: 10,
    })
  
    const savedBlog = await newBlog.save()
  
    await api
    .delete(`/api/blogs/${savedBlog._id}`)
    .expect(204)
  
    const deletedBlog = await Blog.findById(savedBlog._id)
    expect(deletedBlog).toBeNull()
  })



  test('returns 404 if the blog post is not found', async () => {
    const nonExistingId = '5fb50c78d4d2f3c9534dbaaa'; 
  
    await api.delete(`/api/blogs/${nonExistingId}`).expect(404);
  });
})

afterAll(async () => {
  await mongoose.connection.close()
})