/* The code `const Books = require('../models/Books')` and `const Authors =
require('../models/Authors')` is importing the `Books` and `Authors` models from the
`../models/Books` and `../models/Authors` files respectively. These models are likely defined in
separate files and are used to interact with the database to perform operations such as retrieving
books, saving books, and updating author information. */
const Books = require('../models/books.model')
const Authors = require('../models/authors.model')

/**
 * The function `getBooks` is an asynchronous function that retrieves books from a database and filters
 * them based on a given title, returning the filtered books or all books if no title is provided.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, query parameters, and body. In this case, the
 * `req.query` property is used to access the query parameters of the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or sending an empty response.
 * @returns The function `getBooks` returns a response with a status code and a JSON object. The
 * returned JSON object contains either the filtered books (if a title is provided) or all the books
 * (if no title is provided).
 */
const getAllBooks = async (req, res) => {
  const { title } = req.query

  try {
    const books = await Books.find({}).populate('authorId').populate('reviews')

    if (title) {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      )

      return title.length
        ? res.status(200).json(filteredBooks)
        : res.status(204).json({})
    }

    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({ message: `${error}` })
  }
}

/**
 * The function `postBook` saves a new book to the database and updates the author's bookId array with
 * the saved book's id.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, request URL, and more.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 */
const postBook = async (req, res) => {
  try {
    const book = new Books(req.body)
    const author = await Authors.findById(req.body.authorId)
    const savedBook = await book.save()
    author.bookId.push(savedBook._id)
    await author.save()
    res.status(200).json(savedBook)
  } catch (error) {
    res.status(500).json({ message: `${error}` })
  }
}

/* `module.exports = { getBooks, postBook }` is exporting the `getBooks` and `postBook` functions from
this file so that they can be used in other files. By exporting these functions, other files can
import them using the `require` function and use them to perform operations such as retrieving books
or saving a new book to the database. */
module.exports = { getAllBooks, postBook }
