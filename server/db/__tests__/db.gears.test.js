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

it('addCategory', () => {
  const mockCategory = { category: 'others', userId: 1 }
  return gearsDb.addCategory(mockCategory, testDb).then((categories) => {
    expect(categories).toHaveLength(3)
    expect(categories[2].category).toBe('others')
  })
})

it('addGear', () => {
  const mockGear = {
    gear: 'gas',
    description: 'emergency',
    price: 10,
    weight: 110,
    quantity: 1,
    categoryId: 2,
    userId: 1,
  }
  return gearsDb.addGear(mockGear, testDb).then((gears) => {
    expect(gears).toHaveLength(4)
    expect(gears[3].gear).toBe('gas')
  })
})

it('deleteGear', () => {
  return gearsDb.deleteGear(2, 1, testDb).then((gears) => {
    expect(gears).toHaveLength(2)
    expect(gears[0].gear).toBe('tent')
  })
})

it('deleteCategory', () => {
  return gearsDb.deleteCategory(2, 1, testDb).then((categories) => {
    expect(categories).toHaveLength(1)
    expect(categories[0].category).toBe('Big Three')
  })
})
