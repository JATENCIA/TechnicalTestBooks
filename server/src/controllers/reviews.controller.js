/* `const Review = require('../models/review')` is importing the `Review` model from the
`../models/review` file. This allows the code to use the `Review` model to interact with the
database and perform operations such as creating, updating, and deleting reviews. */
const Review = require('../models/review.model')
const Books = require('../models/books.model')
const Users = require('../models/users.model')

/**
 * The createReview function creates a new review for a book and associates it with the current user.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a JSON response with the newly created review object if the review is successfully created
 * and saved. If there is an error, it will return a JSON response with an error message.
 */
const createReview = async (req, res) => {
  const { review, rating, book } = req.body
  try {
    const foundBook = await Books.findById(book)
    const currentUser = await Users.findById(req.user.id)

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!foundBook) {
      return res.status(404).json({ message: 'Book not found' })
    }

    const newReview = new Review({
      review,
      rating,
      book: foundBook._id,
      user: currentUser._id
    })

    await newReview.save()

    currentUser.reviews.push(newReview._id)
    foundBook.reviews.push(newReview._id)

    await Promise.all([currentUser.save(), foundBook.save()])

    res.status(201).json(newReview)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * The function updates a review with the given ID and returns the updated review.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, request body, request parameters, etc. It is an
 * object that is passed to the route handler function when a request is made to the server.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 */
const updateReview = async (req, res) => {
  try {
    const { id } = req.params
    const review = req.body
    const updatedReview = await Review.findByIdAndUpdate(id, review, {
      new: true
    })
    res.status(200).json(updatedReview)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * The function `deleteReview` deletes a review from the database and returns a success message or an
 * error message if an error occurs.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request parameters, etc. It is an object
 * that is provided by the Express.js framework.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to set the status code, headers, and
 * send the response body. In this case, it is used to send a JSON response with a status code of
 */
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params
    await Review.findByIdAndDelete(id)
    res.status(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/* `module.exports = { createReview, updateReview, deleteReview }` is exporting the three functions
`createReview`, `updateReview`, and `deleteReview` as an object. This allows other files or modules
to import and use these functions by requiring the file that contains this code. */
module.exports = { createReview, updateReview, deleteReview, getReviews }
