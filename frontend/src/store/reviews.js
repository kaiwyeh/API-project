import { csrfFetch } from "./csrf";

//TYPE
const CREATE_REVIEW = '/reviews/createReview'
const READ_ALL_REVIEWS = '/reviews/readAllReviews'
const DELETE_REVIEW = '/reviews/deleteReview'

//ACTION
const createReview = (review) => {
 return {
  type: CREATE_REVIEW,
  review
 }
}

const readAllReviews = (reviews) => {
 return {
  type: READ_ALL_REVIEWS,
  reviews
 }
}

const deleteReview = (id) => {
 return {
  type: DELETE_REVIEW,
  id
 }
}

//THUNK
export const createAReview = (payload) => async (dispatch) => {
 const response = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
  method: 'POST',
  header: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
 })
 if (response.ok) {
  const review = await response.json()
  dispatch(createReview(review))
 }
}

export const getAllReviewsById = (id) => async (dispatch) => {
 const response = await csrfFetch(`/api/spots/${id}/reviews`)

 if (response.ok) {
  const reviews = await response.json()
  dispatch(readAllReviews(reviews))
 }
}


export const deleteReviewById = (id) => async (dispatch) => {
 const response = await csrfFetch(`/api/reviews/${id}`, {
  method: 'DELETE',
  // header: { 'Content-Type': 'application/json' },
  // body: JSON.stringify(payload)
 })
 if (response.ok) {
  dispatch(deleteReview(id))
 }
}



//REDUCER
const initalState = {}

const reviewReducer = (state = initalState, action) => {
 let newState = { ...state }

 switch (action.type) {
  case CREATE_REVIEW: {
   newState[action.review.id] = action.review
   return newState
  }
  case READ_ALL_REVIEWS: {
   let newState = {}
   action.reviews.forEach(review => newState[review.id] = review)
   return newState
  }
  case DELETE_REVIEW: {
   delete newState[action.id]
   return newState
  }
  default:
   return state
 }
}


export default reviewReducer
