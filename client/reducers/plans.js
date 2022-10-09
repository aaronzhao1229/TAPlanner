import { SET_PLANS_SUCCESS } from '../actions/planner'

const initialState = []
function plans(state = initialState, action) {
  switch (action.type) {
    case SET_PLANS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default plans
