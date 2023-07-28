import { useBooks } from '../context/BooksContex'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const BooksPage = () => {
  const { books, allBooks } = useBooks()

  useEffect(() => {
    allBooks()
  }, [])

  return (
    <div className=' container grid grid-cols-3 gap-x-4 gap-y-8 mx-auto p-24'>
      {books.map((book) => {
        return (
          <Link to={`/detail/${book._id}`} key={book._id}>
            <div
              key={book._id}
              className='h-[470px] w-[350px] rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition flex flex-col items-center p-8'>
              <h2 className='text-xl w-[250px] h-[70px] mb-2 font-bold text-center'>
                {book.title}
              </h2>
              <img
                className='w-[290px] h-[350px]'
                src={book.image}
                alt={book.title}
              />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default BooksPage
