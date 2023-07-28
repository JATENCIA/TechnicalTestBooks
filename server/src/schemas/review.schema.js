const { z } = require('zod')

const reviewSchema = z.object({
  rating: z
    .number({
      required_error: 'Rating is required'
    })
    .min(1, { message: 'Rating must be between 1 and 5' })
    .max(5, { message: 'Rating must be between 1 and 5' }),

  review: z
    .string({
      required_error: 'Review is required'
    })
    .min(10, { message: 'Review must be at least 10 characters long' })
    .max(500, { message: 'Review must be at most 500 characters long' }),
  book: z.string({
    required_error: 'Book is required'
  })
})

module.exports = { reviewSchema }
