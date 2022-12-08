import { SET_GEARCATEGORIES_SUCCESS } from '../actions/gearCategories'

const initialState = []

function gearCategories(state = initialState, action) {
  switch (action.type) {
    case SET_GEARCATEGORIES_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default gearCategories
