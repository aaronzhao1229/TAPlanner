import { SET_SECTIONS_SUCCESS } from '../actions/planner'

const initialState = []
function sections(state = initialState, action) {
  switch (action.type) {
    case SET_SECTIONS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default sections
