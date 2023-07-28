const { Router } = require('express')
const router = Router()
const booksRoute = require('./books.routes')
const reviewsRoute = require('./reviews.routes')
const authorsRoute = require('./authors.routes')
const authRoute = require('./auth.routes')

router.use('/auth', authRoute)
router.use('/books', booksRoute)
router.use('/authors', authorsRoute)
router.use('/reviews', reviewsRoute)

module.exports = router
