import { createContext, useContext, useEffect, useState } from 'react'
import { getBooks } from '../api/books'

const BooksContext = createContext()

export const useBooks = () => {
  const context = useContext(BooksContext)
  if (!context) throw new Error('useBooks must be used within a ReviewProvider')

  return context
}

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([])

  // Cargar los libros al iniciar la aplicación
  const allBooks = async () => {
    const booksData = await (await getBooks()).data
    setBooks(booksData)
  }

  useEffect(() => {
    const cachedBooks = localStorage.getItem('cachedBooks')
    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks))
    } else {
      allBooks()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cachedBooks', JSON.stringify(books))
  }, [books])

  return (
    <BooksContext.Provider value={{ books, allBooks }}>
      {children}
    </BooksContext.Provider>
  )
}
