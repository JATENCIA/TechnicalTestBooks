import { createContext, useContext } from 'react'

const ReviewContext = createContext()

export const useReviews = () => {
  const context = useContext(ReviewContext)
  if (!context)
    throw new Error('useReviews must be used within a ReviewProvider')

  return context
}

export const ReviewProvider = ({ children }) => {
  const createReview = async (review) => {
    console.log(
      '🚀 ~ file: ReviewsContex.jsx:15 ~ createReview ~ review:',
      review
    )
  }

  return (
    <ReviewContext.Provider value={{ createReview }}>
      {children}
    </ReviewContext.Provider>
  )
}
