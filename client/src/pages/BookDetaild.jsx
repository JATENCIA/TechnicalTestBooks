import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useBooks } from '../context/BooksContex'
import { useReviews } from '../context/ReviewsContex'

const BookDetaild = () => {
  const { register, handleSubmit } = useForm()
  const { books, allBooks } = useBooks()
  const { id } = useParams()
  const { reviewF } = useReviews()

  const [currentBook, setCurrentBook] = useState(null)

  const book = books.find((book) => book._id === id)

  useEffect(() => {
    setCurrentBook(book)
  }, [book])

  const onSubmite = handleSubmit(async (data) => {
    const { rating, review } = data
    const value = {
      rating: Number(rating),
      review,
      book: id
    }
    await reviewF(value)
  })

  useEffect(() => {
    allBooks()
  }, [])

  if (!currentBook) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <div className='container flex flex-col gap-4 py-5 mx-auto shadow-2xl p-y-10'>
        <p className='text-center font-Fraunces font-black text-5xl py-5 uppercase'>
          {currentBook.title}
        </p>
        <div className=' flex place-conten-center mx-auto gap-12'>
          <div className=''>
            <p>{currentBook.author}</p>
            <img
              className='w-[350px] h-[380px] mx-auto mb-4'
              src={currentBook.image}
              alt={currentBook.title}
            />
          </div>
          <div className='container flex items-center justify-center mx-auto max-w-[250px] '>
            <div className=''>
              <img
                src={currentBook.authorId.image}
                alt={currentBook.authorId.name}
                className='w-[80px] h-[80px] border border-gray-400 p-1 rounded-full shadow -mt-[190px] mr-10'
              />
            </div>
            <div className='flex flex-col gap-x-3 -mt-[300px] ml-4'>
              <p className='font-Barlow text-md font-black uppercase text-gray-800 text-center '>
                {currentBook.authorId.name} {currentBook.authorId.lastName}
              </p>
              <p className='font-Fraunces text-xs font-black uppercase text-gray-600 text-center'>
                {currentBook.authorId.country}
              </p>
              <div className='absolute pt-[80px] -ml-20 uppercase'>
                <p className='flex items-center font-Fraunces text-gray-400 mb-6 mt-4'>
                  <span className='mr-4 text-gray-500 font-Barlow '>
                    publisher:
                  </span>
                  {currentBook.publisher}
                </p>
                <p className='flex items-center font-Fraunces text-gray-400 mb-6'>
                  <span className='mr-4 text-gray-500 font-Barlow '>
                    publication:
                  </span>
                  {currentBook.publicationDate}
                </p>
                <p className='flex items-center font-Fraunces text-gray-400 mb-6'>
                  <span className='mr-4 text-gray-500 font-Barlow '>
                    language:
                  </span>
                  {currentBook.language}
                </p>

                <p className='flex items-center font-Fraunces text-gray-400 mb-6'>
                  <span className='mr-4 text-gray-500 font-Barlow '>
                    category:
                  </span>{' '}
                  {currentBook.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        className='container w-[500px] ] flex flex-col gap-4 my-10 border border-gray-500 rounded-md mx-auto p-5'
        onSubmit={onSubmite}>
        <select
          className='border-2 border-gray-400  rounded-md p-2 font-Barlow text-lg bg-white '
          {...register('rating')}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>

        <textarea
          placeholder='Review'
          className='border-2 border-gray-400  rounded-md p-2 font-Barlow text-lg bg-white'
          {...register('review')}></textarea>
        <button className='border-2 border-gray-400  rounded-md p-2  text-lg bg-white uppercase hover:bg-gray-300 transition font-Fraunces'>
          save
        </button>
      </form>
      <div className='container flex flex-col gap-4 my-10 mx-auto p-5 shadow-2xl '>
        {currentBook?.reviews?.map((review) => {
          return (
            <p
              className='font-Barlow text-md font-black uppercase text-gray-800 text-center  '
              key={review._id}>
              {review.review}
            </p>
          )
        })}
      </div>
    </section>
  )
}

export default BookDetaild
