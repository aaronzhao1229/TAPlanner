import { SET_TRACKS_SUCCESS } from '../actions/planner'

const initialState = []
function tracks(state = initialState, action) {
  switch (action.type) {
    case SET_TRACKS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default tracks
