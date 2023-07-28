import axios from './axios'

export const createReview = (review) => axios.post('/reviews', review)
export const updateReview = (review) =>
  axios.put(`/reviews/${review.id}`, review)
export const deleteReview = (id) => axios.delete(`/reviews/${id}`)
