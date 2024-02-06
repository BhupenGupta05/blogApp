import axios from 'axios'
const baseUrl = '/api/blogs'
// const baseUrl = 'https://blogapp-backend-zatg.onrender.com/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const getBlogById = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(`${baseUrl}/${blogId}`, config)
  return response.data
}

const getCommentsByBlogId = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${blogId}`, config)
  return response.data
}

const update = async(id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${id}`, newObject, config)
  return response.data[response.data.length-1]
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default {
  getAll,
  getCommentsByBlogId,
  getBlogById,
  update,
  create,
  createComment,
  remove,
  setToken
}