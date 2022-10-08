import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getAllInfo,
  getPlansForUser,
  addPlanForUser,
} from '../apis/apiClient'

export const SET_REGIONS_SUCCESS = 'SET_REGIONS_SUCCESS'
export const SET_TRACKS_SUCCESS = 'SET_TRACKS_SUCCESS'
export const SET_SECTIONS_SUCCESS = 'SET_SECTIONS_SUCCESS'
export const SET_STOPS_SUCCESS = 'SET_STOPS_SUCCESS'
// export const SET_ALLINFO_SUCCESS = 'SET_ALLINFO_SUCCESS'
export const SET_PLANS_SUCCESS = 'SET_PLANS_SUCCESS'

export function fetchRegions() {
  return (dispatch) => {
    return getRegions()
      .then((regions) => {
        dispatch(setRegionsSuccess(regions))
      })
      .catch((err) => {
        console.error(err.message)
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
        console.error(err.message)
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
        console.error(err.message)
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
        console.error(err.message)
      })
  }
}

export function fetchPlansForUser(userId) {
  return (dispatch) => {
    return getPlansForUser(userId)
      .then((plans) => {
        dispatch(setPlansSuccess(plans))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function addNewPlanForUser(plan) {
  return (dispatch) => {
    return addPlanForUser(plan)
      .then((plans) => {
        dispatch(setPlansSuccess(plans))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}
// export function fetchAllInfo(regionId, trackId, sectionId, stopId) {
//   return (dispatch) => {
//     return getAllInfo(regionId, trackId, sectionId, stopId)
//       .then((trip) => {
//         dispatch(setAllInfoSuccess(trip))
//       })
//       .catch((err) => {
//         console.error(err.message)
//       })
//   }
// }

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

export function setPlansSuccess(plan) {
  return { type: SET_PLANS_SUCCESS, payload: plan }
}
// export function setAllInfoSuccess(trip) {
//   return { type: SET_ALLINFO_SUCCESS, payload: trip }
// }
