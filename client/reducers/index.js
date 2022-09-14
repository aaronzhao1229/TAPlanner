import { combineReducers } from 'redux'
import regions from './regions'
import tracks from './tracks'
import sections from './sections'

export default combineReducers({ regions, tracks, sections })
