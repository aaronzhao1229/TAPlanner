const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]

const connection = require('knex')(config)

module.exports = {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
}

function getRegions(db = connection) {
  return db('regions').select()
}

function getTracksByRegionId(regionId, db = connection) {
  return db('tracks').select().where('regionId', regionId)
}

function getSectionsByTrackId(trackId, db = connection) {
  return db('sections').select().where('trackId', trackId)
}

function getStopsByTrackId(trackId, db = connection) {
  return db('stops').select().where('trackId', trackId)
}
