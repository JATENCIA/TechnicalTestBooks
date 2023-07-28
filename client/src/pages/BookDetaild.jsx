import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useBooks } from '../context/BooksContex'
import { useReviews } from '../context/ReviewsContex'

const BookDetaild = () => {
  const { register, handleSubmit } = useForm()
  const { books, allBooks } = useBooks()
  const { id } = useParams()
  const { createReview } = useReviews()

  const [currentBook, setCurrentBook] = useState(null)

  const book = books.find((book) => book._id === id)

  useEffect(() => {
    setCurrentBook(book)
  }, [book])

  const onSubmite = handleSubmit((data) => {
    const { rating, review } = data
    const value = {
      rating: Number(rating),
      review,
      bookId: id
    }
    createReview(value)
  })

  useEffect(() => {
    allBooks()
  }, [allBooks])

  if (!currentBook) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <div>
        <div>
          <p className='text-center text-white font-bold text-2xl'>
            {currentBook.title}
          </p>
          <p>{currentBook.author}</p>
          <img src={currentBook.image} alt={currentBook.title} />
          <img
            src={currentBook.authorId.image}
            alt={currentBook.authorId.name}
          />
          <p>
            {currentBook.authorId.name} {currentBook.authorId.lastname}
          </p>
          <p>{currentBook.authorId.country}</p>
        </div>
      </div>

      <form className='flex flex-col gap-4' onSubmit={onSubmite}>
        <select {...register('rating')}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>

        <textarea placeholder='Review' {...register('review')}></textarea>
        <button>save</button>
      </form>
    </section>
  )
}

export default BookDetaild
