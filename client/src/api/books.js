import axios from './axios'

export const getBooks = () => axios.get('/books')
