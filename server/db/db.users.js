const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  createProfile,
  getUserById,
  storeAuth0Id,
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

function storeAuth0Id(user, db = connection) {
  return db('users')
    .update({
      auth0Id: user.auth0Id,
    })
    .where({ firstName: user.firstName, lastName: user.lastName })
}

function getUserById(auth0Id, db = connection) {
  return db('users').select().where('auth0Id', auth0Id)
}
