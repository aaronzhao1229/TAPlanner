const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  getRegions,
}

function getRegions(db = connection) {
  return db('regions').select()
}
