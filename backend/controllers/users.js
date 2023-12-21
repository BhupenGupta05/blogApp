const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User    
  .find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)
  })

//1. Validate that both username and password are provided.
//2. Check if both username and password are at least 3 characters long.
//3. Verify that the username is unique.

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if(!username || !password) {
      return response.status(400).json({error: 'Both username and password are required.'})
    }

    if(username.length < 3 || password.length < 3) {
      return response.status(400).json({error: 'Username and password must be at least 3 characters long.'})
    }

    // Check if username is unique
    const existingUser = await User.findOne({username})
    if(existingUser) {
      return response.status(400).json({ error: 'Username must be unique.' })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  })
  
  module.exports = usersRouter