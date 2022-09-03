const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  getRegions,
  getTracksByRegionId,
}

function getRegions(db = connection) {
  return db('regions').select()
}

function getTracksByRegionId(regionId, db = connection) {
  return db('tracks').select().where('regionId', regionId)
}
