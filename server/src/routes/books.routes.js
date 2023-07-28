const { Router } = require('express')
const router = Router()
const { getAllBooks, postBook } = require('../controllers/books.controller')

router.get('/', getAllBooks)
router.post('/', postBook)

module.exports = router
