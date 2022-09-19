const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  createProfile,
  getUserById,
}

function createProfile(user, db = connection) {
  return db('users').insert({
    auth0Id: user.auth0Id,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    image: user.image,
  })
}

function getUserById(auth0Id, db = connection) {
  return db('users').select().where('auth0Id', auth0Id)
}
