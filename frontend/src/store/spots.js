import { csrfFetch } from "./csrf";

//TYPE
const CREATE_SPOT = '/spots/createSpot'
const GET_ALL_SPOTS = '/spots/getAllSpots'
const GET_ONE_SPOT = '/spots/getOneSpot'
const UPDATE_SPOT = '/spots/updateSpot'
const DELETE_SPOT = '/spots/deleteSpot'


//ACTION
const createSpot = (spot) => {
 return {
  type: CREATE_SPOT,
  spot
 }
}

const getAllSpots = (spot) => {
 return {
  type: GET_ALL_SPOTS,
  spot
 }
}

const getOneSpot = (spot) => {
 return {
  type: GET_ONE_SPOT,
  spot
 }
}

const updateSpot = (spot) => {
 return {
  type: UPDATE_SPOT,
  spot
 }
}

const deleteSpot = (id) => {
 return {
  type: DELETE_SPOT,
  id
 }
}

//THUNK
export const createASpot = (payload) => async (dispatch) => {
 const response = await csrfFetch('/api/spots', {
  method: 'POST',
  header: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
 })
 if (response.ok) {
  const spot = await response.json()
  dispatch(createSpot(spot))
 }
}

export const getAllTheSpots = () => async (dispatch) => {
 const response = await csrfFetch('/api/spots')

 if (response.ok) {
  const spot = await response.json()
  dispatch(getAllSpots(spot))
 }
}

export const getSpotById = (id) => async (dispatch) => {
 const response = await csrfFetch(`/api/spots/${id}`)
 const spot = await response.json()
 dispatch(getOneSpot(spot))
}

export const updateASpot = (payload) => async (dispatch) => {
 const response = await csrfFetch(`/api/spots/${payload.id}`, {
  method: 'PUT',
  header: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
 })
 if (response.ok) {
  const spot = await response.json()
  dispatch(updateSpot(spot))
 }
}

export const deleteSpotById = (id) => async (dispatch) => {
 const response = await csrfFetch(`/api/spots/${id}`, {
  method: 'DELETE',
  header: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
 })
 if (response.ok) {
  dispatch(deleteSpot(id))
 }
}


//REDUCER
const initalState = {}

const spotReducer = (state = initalState, action) => {
 let newState = { ...state }

 switch (action.type) {
  case CREATE_SPOT: {
   newState[action.payload.id] = action.payload
   return newState
  }
  case GET_ALL_SPOTS: {
   let newState = {}
   action.spots.forEach(spot => newState[spot.id] = spot)
   return newState
  }
  case GET_ONE_SPOT: {
   newState[action.spot.id] = action.spot
   return newState
  }
  case UPDATE_SPOT: {
   newState[action.spot.id] = action.spot
   return newState
  }
  case DELETE_SPOT: {
   delete newState[action.id]
   return newState
  }
  default:
   return state
 }
}


export default spotReducer
