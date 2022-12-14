export const UPDATE_LOCATION = 'UPDATE_LOCATION'
import { getLocations } from '../apis/location'

export function fetchLocations(text) {
  return (dispatch) => {
    return getLocations(text)
      .then((locations) => {
        dispatch(updateLocation(locations))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function updateLocation(locations) {
  return {
    type: UPDATE_LOCATION,
    payload: locations,
  }
}
