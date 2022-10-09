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
  it('returns the correct track array', () => {
    return db.getTracksByRegionId(1, testDb).then((tracks) => {
      expect(tracks).toHaveLength(3)
      expect(tracks[0].name).toBe('Queen Charlotte Track')
    })
  })
})

describe('getSectionsByTrackId', () => {
  it('returns the correct sections array', () => {
    return db.getSectionsByTrackId(1, testDb).then((sections) => {
      expect(sections).toHaveLength(6)
      expect(sections[0].name).toContain('Ship')
    })
  })
})

describe('getStopsByTrackId', () => {
  it('returns the correct stops array', () => {
    return db.getStopsByTrackId(1, testDb).then((stops) => {
      expect(stops).toHaveLength(8)
      expect(stops[0].name).toContain('School')
    })
  })
})
