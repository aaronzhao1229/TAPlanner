import { SET_STOPS_SUCCESS } from '../actions/planner'

const initialState = []
function stops(state = initialState, action) {
  switch (action.type) {
    case SET_STOPS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default stops
