import { SET_ALLINFO_SUCCESS } from '../actions/planner'

const initialState = []
function allInfo(state = initialState, action) {
  switch (action.type) {
    case SET_ALLINFO_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default allInfo
