const { Router } = require('express')
const router = Router()

const {
  getAllAuthors,
  postAuthor
} = require('../controllers/authors.controller')

router.get('/', getAllAuthors)
router.post('/', postAuthor)

module.exports = router
