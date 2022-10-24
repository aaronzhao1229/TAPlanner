const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)
const gearsDb = require('../db.gears')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

it('getGears for userId 1', () => {
  return gearsDb.getGears(1, testDb).then((gears) => {
    expect(gears).toHaveLength(3)
    expect(gears[0].gear).toBe('tent')
  })
})

it('getCategory for userId 1', () => {
  return gearsDb.getCategory(1, testDb).then((categories) => {
    expect(categories).toHaveLength(2)
    expect(categories[0].category).toBe('Big Three')
  })
})
