import { combineReducers } from 'redux'
import regions from './regions'
import tracks from './tracks'
import sections from './sections'
import stops from './stops'

export default combineReducers({ regions, tracks, sections, stops })
