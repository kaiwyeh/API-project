import { csrfFetch } from './csrf'

const LOAD = 'spots/GET_SPOTS'
const GET = 'spots/GET_SPOT_ID'
const GET_USER_SPOT = 'spots/GET_USER_SPOT'
const CREATE = 'spots/CREATE_SPOTS'
const DELETE = 'spots/DELETE_SPOTS'
const UPDATE = 'spots/UPDATE_SPOTS'

export const getSpots = (spots) => ({
  type: LOAD,
  payload: spots
})

export const getSpotsId = (spot) => ({
  type: GET,
  payload: spot
})
export const getUserSpot = (spots) => ({
  type: GET_USER_SPOT,
  payload: spots
})

export const createSpot = (spot) => ({
  type: CREATE,
  payload: spot
})

export const deleteSpot = (id) => ({
  type: DELETE,
  payload: id
})

export const updateSpot = (spot) => ({
  type: UPDATE,
  payload: spot
})

export const deleteSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    dispatch(deleteSpot(id))
  }
}

export const getSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots')

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpots(data))
  }
}

export const getSpotsIdThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpotsId(data))
  }
}

export const getUserSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');

  if (response.ok) {
    const data = await response.json()
    dispatch(getUserSpot(data))
  }
}

export const editUserSpotsThunk = (spot, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot)
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpotsIdThunk(data))
  }
}


export const createSpotThunk = (spot) => async (dispatch) => {

  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot)
  });

  if (response.ok) {
    const spotData = await response.json()

    const imgRes = await csrfFetch(`api/spots/${spotData.id}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: spot.imageUrl,
        //spotId: spotData.id,
        preview: true
      })
    })

    if (imgRes.ok) {
      const imgData = await imgRes.json()
      spotData.previewImage = imgData.url;
      dispatch(createSpot(spotData))
    }
  }
}



const initialState = { allSpots: {}, singleSpot: {} };

export default function spotsReducer(state = initialState, action) {
  let newState = [];
  switch (action.type) {
    case LOAD:
      newState.allSpots = action.payload.Spots
      return newState;
    case GET:
      newState.singleSpot = action.payload
      return newState;
    case GET_USER_SPOT:
      newState.allSpots = action.payload.Spots
      return newState;
    case CREATE:
      newState.singleSpot = action.payload
      return newState;
    case UPDATE:
      newState.singleSpot = action.payload
      return newState;
    default:
      return state
  }
}
