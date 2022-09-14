import { getRegions, getTracksByRegionId } from '../apis/apiClient'

export const SET_REGIONS_SUCCESS = 'SET_REGIONS_SUCCESS'
export const SET_TRACKS_SUCCESS = 'SET_TRACKS_SUCCESS'

export function fetchRegions() {
  return (dispatch) => {
    return getRegions()
      .then((regions) => {
        dispatch(setRegionsSuccess(regions))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export function fetchTracksByRegionId(regionId) {
  return (dispatch) => {
    return getTracksByRegionId(regionId)
      .then((tracks) => {
        dispatch(setTracksSuccess(tracks))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export function setRegionsSuccess(regions) {
  return { type: SET_REGIONS_SUCCESS, payload: regions }
}

export function setTracksSuccess(tracks) {
  return { type: SET_TRACKS_SUCCESS, payload: tracks }
}
