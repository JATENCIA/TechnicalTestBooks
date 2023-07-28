/* The line `const Authors = require('../models/Authors')` is importing the `Authors` model from the
`../models/Authors` file. This allows the code to use the `Authors` model to interact with the
database and perform operations such as retrieving all authors or creating a new author. */
const Authors = require('../models/authors.model')

/**
 * The function `getAllAuthors` retrieves all authors from a database and filters them based on a
 * provided name, returning the filtered authors or all authors if no name is provided.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request such as headers, query parameters, and request body. It is used to retrieve
 * information from the client and pass it to the server.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or sending an empty response.
 */
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Authors.find({}).populate('bookId')
    const { name } = req.query
    if (name) {
      const authorFilter = authors.filter((author) =>
        author.name.toLowerCase().includes(name.toLowerCase())
      )
      name.length
        ? res.status(200).json(authorFilter)
        : res.status(204).json({})
    }
    res.json(authors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * The function `postAuthor` creates a new author object and saves it to the database, then returns the
 * created author object in the response.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request headers, request body, request method, request URL, and
 * other relevant details.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this code snippet, it is used to send a JSON response with the created
 * author
 */
const postAuthor = async (req, res) => {
  try {
    const author = new Authors(req.body)
    await author.save()
    res.status(201).json(author)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* `module.exports = { getAllAuthors, postAuthor }` is exporting the `getAllAuthors` and `postAuthor`
functions as properties of an object. This allows other files to import and use these functions by
accessing them as properties of the imported object. */
module.exports = { getAllAuthors, postAuthor }
