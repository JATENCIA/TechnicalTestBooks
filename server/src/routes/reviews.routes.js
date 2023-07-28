const { Router } = require('express')
const router = Router()

const {
  createReview,
  updateReview,
  deleteReview,
  getReviews
} = require('../controllers/reviews.controller')

const authRequired = require('../middleware/validateToken.middleware')
const { reviewSchema } = require('../schemas/review.schema')
const validateSchema = require('../middleware/validator.middleware')

router.post('/', authRequired, validateSchema(reviewSchema), createReview)
router.put('/:id', authRequired, updateReview)
router.delete('/:id', authRequired, deleteReview)
router.get('/', authRequired, getReviews)

module.exports = router
