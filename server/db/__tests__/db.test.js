const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)
const db = require('../db')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('getRegions', () => {
  it('returns the correct regions array', () => {
    return db.getRegions(testDb).then((regions) => {
      expect(regions).toHaveLength(5)
    })
  })
})

describe('getTracksByRegionId', () => {
  it('returns the correct regions array', () => {
    return db.getTracksByRegionId(1, testDb).then((tracks) => {
      expect(tracks).toHaveLength(3)
      expect(tracks[0].name).toBe('Queen Charlotte Track')
    })
  })
})
