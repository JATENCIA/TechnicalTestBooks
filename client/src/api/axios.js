import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://technical-test-books.vercel.app/',
  withCredentials: true
})

export default instance
