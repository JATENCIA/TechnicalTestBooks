import axios from 'axios'

// baseURL: 'http://localhost:5000/api',
const instance = axios.create({
  baseURL: 'https://technical-test-books.vercel.app/api',
  withCredentials: true
})

export default instance
