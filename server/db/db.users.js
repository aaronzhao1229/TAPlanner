const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]

const connection = require('knex')(config)

module.exports = {
  createProfile,
  getUserById,
  addPlanForUser,
  getPlansForUser,
  deletePlanForUser,
}

function createProfile(user, db = connection) {
  return db('users').insert(
    {
      auth0Id: user.auth0Id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      image: user.image,
    },
    'id'
  )
}

function getUserById(auth0Id, db = connection) {
  return db('users').select().where('auth0Id', auth0Id)
}

function addPlanForUser(plan, db = connection) {
  let planId = null
  return db('plans')
    .insert(
      {
        userId: plan.userId,
        day: plan.day,
        additionalNotes: plan.additionalNotes,
      },
      'id'
    )
    .then((newId) => {
      planId = newId[0].id
      return addPlanRegions(planId, plan, db)
    })
    .then(() => addPlanTracks(planId, plan, db))
    .then(() => addPlanSections(planId, plan, db))
    .then(() => addPlanStops(planId, plan, db))
    .then(() => {
      return getPlansForUser(plan.userId, db)
    })
}

function addPlanRegions(planId, plan, db = connection) {
  return db('plan_regions').insert({
    planId: planId,
    regionId: plan.regionId,
  })
}

function addPlanTracks(planId, plan, db = connection) {
  return db('plan_tracks').insert({
    planId: planId,
    trackId: plan.trackId,
  })
}

function addPlanSections(planId, plan, db = connection) {
  return db('plan_sections').insert({
    planId: planId,
    sectionId: plan.sectionId,
  })
}

function addPlanStops(planId, plan, db = connection) {
  return db('plan_stops').insert({
    planId: planId,
    stopId: plan.stopId,
  })
}

function deletePlanForUser(planId, userId, db = connection) {
  return deletePlanStops(planId, db)
    .then(() => deletePlanSections(planId, db))
    .then(() => deletePlanTracks(planId, db))
    .then(() => deletePlanRegions(planId, db))
    .then(() => {
      return db('plans').delete().where('id', planId)
    })
    .then(() => getPlansForUser(userId, db))

  // return db('plans')
  //   .delete()
  //   .where('id', planId)
  //   .then(() => deletePlanStops(planId, db))
  //   .then(() => deletePlanSections(planId, db))
  //   .then(() => deletePlanTracks(planId, db))
  //   .then(() => deletePlanRegions(planId, db))
  //   .then(() => getPlansForUser(userId, db))
}

function deletePlanRegions(planId, db = connection) {
  return db('plan_regions').delete().where('planId', planId)
}

function deletePlanTracks(planId, db = connection) {
  return db('plan_tracks').delete().where('planId', planId)
}

function deletePlanSections(planId, db = connection) {
  return db('plan_sections').delete().where('planId', planId)
}

function deletePlanStops(planId, db = connection) {
  return db('plan_stops').delete().where('planId', planId)
}

function getPlansForUser(userId, db = connection) {
  return db('plans')
    .join('plan_regions', 'plans.id', 'plan_regions.planId')
    .join('regions', 'regions.id', 'plan_regions.regionId')
    .join('plan_tracks', 'plans.id', 'plan_tracks.planId')
    .join('tracks', 'tracks.id', 'plan_tracks.trackId')
    .join('plan_sections', 'plans.id', 'plan_sections.planId')
    .join('sections', 'sections.id', 'plan_sections.sectionId')
    .join('plan_stops', 'plans.id', 'plan_stops.planId')
    .join('stops', 'stops.id', 'plan_stops.stopId')
    .select(
      'userId',
      'plans.id as planId',
      'day',
      'regions.id as regionId',
      'regions.name as region',
      'tracks.id as trackId',
      'tracks.name as track',
      'tracks.category as category',
      'sections.id as sectionId',
      'sections.name as section',
      'sections.length as length',
      'sections.time as time',
      'sections.notes as notes',
      'stops.id as stopId',
      'stops.name as stop',
      'stops.resupply as resupply',
      'additionalNotes'
    )
    .where('userId', userId)
}
