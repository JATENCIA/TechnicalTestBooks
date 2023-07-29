import { createContext, useContext } from 'react'
import { createReview } from '../api/review'

const ReviewContext = createContext()

export const useReviews = () => {
  const context = useContext(ReviewContext)
  if (!context)
    throw new Error('useReviews must be used within a ReviewProvider')

  return context
}

export const ReviewProvider = ({ children }) => {
  const reviewF = async (review) => {
    console.log(
      '🚀 ~ file: ReviewsContex.jsx:16 ~ createReview ~ review:',
      review
    )
    try {
      const data = await createReview(review)
      console.log(
        '🚀 ~ file: ReviewsContex.jsx:17 ~ createReview ~ data:',
        data
      )
    } catch (error) {
      console.log(
        '🚀 ~ file: ReviewsContex.jsx:27 ~ createReview ~ error:',
        error
      )
    }
  }

  return (
    <ReviewContext.Provider value={{ reviewF }}>
      {children}
    </ReviewContext.Provider>
  )
}
