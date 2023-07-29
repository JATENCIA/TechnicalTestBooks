import { useState, useEffect } from 'react'
import { useBooks } from '../context/BooksContex'
import { Link } from 'react-router-dom'

const BooksPage = () => {
  const { books, allBooks } = useBooks()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAuthor, setSelectedAuthor] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    allBooks()
  }, [])

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value)
  }

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === 'all' || book.category === selectedCategory
    const matchesAuthor =
      selectedAuthor === 'all' || book.authorId.name === selectedAuthor
    const matchesSearchQuery =
      searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesAuthor && matchesSearchQuery
  })

  const category = books.map((book) => book.category)
  const authors = books.map((book) => book.authorId.name)

  const uniqueCategory = [...new Set(category)]
  const uniqueAuthors = [...new Set(authors)]

  return (
    <div>
      <div className='container mx-auto pt-12 flex justify-center '>
        <form className='flex gap-4 '>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className='border-2 border-gray-300  rounded-md p-2 font-Barlow text-lg bg-white uppercase'
            id='category'>
            <option value='all'>category</option>
            {uniqueCategory.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={selectedAuthor}
            onChange={handleAuthorChange}
            className='border-2 border-gray-300  rounded-md p-2 font-Barlow text-lg bg-white uppercase'
            id='author'>
            <option value='all'>author</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
          <input
            type='text'
            placeholder='Search by name'
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className='border-2 border-gray-300 rounded-md p-2 font-Barlow uppercase'
          />
          <button
            type='submit'
            className='border-2 border-gray-300 rounded-md p-2 uppercase hover:bg-gray-100 transition font-Fraunces'>
            search
          </button>
        </form>
      </div>
      {filteredBooks.length === 0 ? (
        <p className='text-center font-Fraunces flex justify-center items-center pt-[300px] font-bold text-red-500 text-4xl mx-auto'>
          No books were found with the selected filters.
        </p>
      ) : (
        <div className='container grid lg:grid-cols-3 md:grid-cols-2  gap-x-4  mx-auto p-24  '>
          {filteredBooks.map((book) => (
            <Link to={`/detail/${book._id}`} key={book._id}>
              <div
                key={book._id}
                className='h-[450px]  w-[350px] rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition flex flex-col items-center p-8'>
                <h2 className='text-lg font-Fraunces w-full h-[70px] mb-2 font-bold text-center uppercase'>
                  {book.title}
                </h2>
                <img
                  className='w-[290px] h-[320px]'
                  src={book.image}
                  alt={book.title}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default BooksPage
