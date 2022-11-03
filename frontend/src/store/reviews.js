import { csrfFetch } from './csrf'

const GET = 'reviews/GET_REVIEWS'
const CREATE = 'reviews/CREATE_REVIEW'
const DELETE = 'reviews/DELETE_REVIEW'


export const getReview = (reviews) => ({
  type: GET,
  payload: reviews
})

export const createReview = (review) => ({
  type: CREATE,
  payload: review
})

export const deleteReview = (id) => ({
  type: DELETE,
  payload: id
})




export const getReviewsThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  if (response.ok) {
    const data = await response.json()
    dispatch(getReview(data))
  }
}

export const createReviewsThunk = (data, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const review = await response.json()
    dispatch(createReview(review))
  }
}

export const deleteReviewThunk = (id, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    dispatch(deleteReview(id))

  }
}

const initialState = { allReviews: {}, singleReview: {} };

export default function reviewsReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET:
      newState = { ...state.allReviews }
      newState.allReviews = action.payload.Reviews
      return newState;
    case CREATE:
      newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState;


    default:
      return state
  }
}
