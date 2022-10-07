const config = require('./knexfile').development

const connection = require('knex')(config)

module.exports = {
  createProfile,
  getUserById,
  planForUser,
  planRegions,
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

function planForUser(plan, db = connection) {
  let planId = null
  return db('plans')
    .insert({
      userId: plan.userId,
      day: plan.day,
      additionalNotes: plan.additionalNotes,
    })
    .then((newId) => {
      planId = newId[0]
      return planRegions(planId, plan)
    })
    .then(() => planTracks(planId, plan))
    .then(() => planSections(planId, plan))
    .then(() => planStops(planId, plan))
}

function planRegions(planId, plan, db = connection) {
  return db('plan_regions').insert({
    planId: planId,
    regionId: plan.regionId,
  })
}

function planTracks(planId, plan, db = connection) {
  return db('plan_tracks').insert({
    planId: planId,
    trackId: plan.trackId,
  })
}

function planSections(planId, plan, db = connection) {
  return db('plan_sections').insert({
    planId: planId,
    sectionId: plan.sectionId,
  })
}

function planStops(planId, plan, db = connection) {
  return db('plan_stops').insert({
    planId: planId,
    stopId: plan.stopId,
  })
}
