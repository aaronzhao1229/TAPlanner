import { UPDATE_LOCATION } from '../actions/locations'

const initialLocations = []

export default function locations(state = initialLocations, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_LOCATION:
      return payload
    default:
      return state
  }
}
