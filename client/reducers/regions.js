import { SET_REGIONS_SUCCESS } from '../actions/planner'

const initialState = []
function regions(state = initialState, action) {
  switch (action.type) {
    case SET_REGIONS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default regions
