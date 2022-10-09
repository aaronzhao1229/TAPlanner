const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)
const userDb = require('../db.users')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getUserById', () => {
  it('check if the use info has been returned', () => {
    return userDb
      .getUserById('google-oauth2|110592088244127871018', testDb)
      .then((user) => {
        expect(user).toHaveLength(1)
        expect(user[0].lastName).toBe('Zhao')
      })
  })
})

describe('createProfile', () => {
  it('check if the new profile has been created', () => {
    const fakeUser = {
      auth0Id: '123',
      firstName: 'William',
      lastName: 'Wilson',
    }
    return userDb
      .createProfile(fakeUser, testDb)
      .then(() => userDb.getUserById(fakeUser.auth0Id, testDb))
      .then((user) => {
        expect(user).toHaveLength(1)
        expect(user[0].lastName).toBe('Wilson')
      })
  })
})

describe('addPlanForUser', () => {
  it('check if plan has been added', () => {
    const fakePlan = {
      userId: 1,
      day: 'Day 100',
      additionalNotes: 'River crossing',
      regionId: 1,
      trackId: 1,
      sectionId: 4,
      stopId: 5,
    }
    return userDb.addPlanForUser(fakePlan, testDb).then((plans) => {
      expect(plans).toHaveLength(3)
      expect(plans[2].stopId).toBe(5)
    })
  })
})

describe('deletePlanForUser', () => {
  it('check if plan has been deleted', () => {
    return userDb.deletePlanForUser(2, 1, testDb).then((plans) => {
      expect(plans).toHaveLength(1)
    })
  })
})
