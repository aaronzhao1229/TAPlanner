import { getRegions } from '../apis/apiClient'

export const SET_REGIONS_SUCCESS = 'SET_REGIONS_SUCCESS'

export function fetchRegions() {
  return (dispatch) => {
    return getRegions()
      .then((regions) => {
        console.log(regions)
        dispatch(setRegionsSuccess(regions))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export function setRegionsSuccess(regions) {
  return { type: SET_REGIONS_SUCCESS, payload: regions }
}
