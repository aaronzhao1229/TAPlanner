const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  createProfile,
}

function createProfile(user, db = connection) {
  return db('users').insert({
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    image: user.image,
  })
}
