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
    // Intentar cargar los datos desde localStorage al iniciar la aplicación
    const cachedBooks = localStorage.getItem('cachedBooks')
    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks))
    } else {
      // Si no hay datos en localStorage, cargar los libros desde el servidor
      allBooks()
    }
  }, [])

  // Guardar los libros en localStorage cada vez que se actualicen
  useEffect(() => {
    localStorage.setItem('cachedBooks', JSON.stringify(books))
  }, [books])

  return (
    <BooksContext.Provider value={{ books, allBooks }}>
      {children}
    </BooksContext.Provider>
  )
}
