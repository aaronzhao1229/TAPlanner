const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getAllInfo,
  uploadImage,
  getImageUrl,
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

function getAllInfo(regionId, trackId, sectionId, stopId, db = connection) {
  return db('regions')
    .join('tracks', 'tracks.regionId', 'regions.id')
    .join('sections', 'sections.trackId', 'tracks.id')
    .join('stops', 'stops.trackId', 'tracks.id')
    .select(
      'regions.name as region',
      'tracks.name as track',
      'tracks.category as category',
      'sections.name as section',
      'sections.length as length',
      'sections.time as time',
      'sections.notes as notes',
      'stops.name as stop',
      'stops.resupply as resupply'
    )
    .where('regions.id', regionId)
    .where('tracks.id', trackId)
    .where('sections.id', sectionId)
    .where('stops.id', stopId)
}

function uploadImage(url, db = connection) {
  return db('image').insert({ url: url })
}

function getImageUrl(db = connection) {
  return db('image').select()
}
