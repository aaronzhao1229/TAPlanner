import { combineReducers } from 'redux'
import regions from './regions'
import tracks from './tracks'
import sections from './sections'
import stops from './stops'
import plans from './plans'
import loggedInUser from './loggedInUser'

export default combineReducers({
  regions,
  tracks,
  sections,
  stops,
  plans,
  loggedInUser,
})
