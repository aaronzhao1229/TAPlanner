import { SET_GEARS_SUCCESS } from '../actions/gears'

const initialState = []

function gears(state = initialState, action) {
  switch (action.type) {
    case SET_GEARS_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default gears
