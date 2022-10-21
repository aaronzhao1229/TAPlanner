import { getGearsForUser } from '../apis/gear.api'

export const SET_GEARS_SUCCESS = 'SET_GEARS_SUCCESS'

export function fetchGearsForUser(userId) {
  return (dispatch) => {
    return getGearsForUser(userId)
      .then((gears) => {
        dispatch(setGearsSuccess(gears))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function setGearsSuccess(gears) {
  return { type: SET_GEARS_SUCCESS, payload: gears }
}
