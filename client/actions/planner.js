import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
} from '../apis/apiClient'

export const SET_REGIONS_SUCCESS = 'SET_REGIONS_SUCCESS'
export const SET_TRACKS_SUCCESS = 'SET_TRACKS_SUCCESS'
export const SET_SECTIONS_SUCCESS = 'SET_SECTIONS_SUCCESS'
export const SET_STOPS_SUCCESS = 'SET_STOPS_SUCCESS'

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

export function fetchSectionsByTrackId(trackId) {
  return (dispatch) => {
    return getSectionsByTrackId(trackId)
      .then((sections) => {
        dispatch(setSectionsSuccess(sections))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export function fetchStopsByTrackId(trackId) {
  return (dispatch) => {
    return getStopsByTrackId(trackId)
      .then((stops) => {
        dispatch(setStopsSuccess(stops))
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

export function setSectionsSuccess(sections) {
  return { type: SET_SECTIONS_SUCCESS, payload: sections }
}

export function setStopsSuccess(stops) {
  return { type: SET_STOPS_SUCCESS, payload: stops }
}
