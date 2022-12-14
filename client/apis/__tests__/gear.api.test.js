import nock from 'nock'

import {
  getGearsForUser,
  getGearCategoriesForUser,
  addGearCategoryForUser,
  addGearForUser,
  deleteGearForUser,
  deleteCategoryForUser,
} from '../gear.api'

describe('GearsForUser', () => {
  it('return data from local api', () => {
    const scope = nock('http://localhost')
      .get('/gears/getgears/1')
      .reply(200, { gear: 'gas', weight: 230 })
    return getGearsForUser(1).then((result) => {
      expect(result.gear).toBe('gas')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('GearCategoriesForUser', () => {
  it('return data from local api', () => {
    const scope = nock('http://localhost')
      .get(`/gears/getGearCategories/1`)
      .reply(200, { category: 'bathroom' })
    return getGearCategoriesForUser(1).then((result) => {
      expect(result.category).toBe('bathroom')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('addGearCategoryForUser', () => {
  it('return all category data after adding a category', () => {
    const fakeCategories = [
      { category: 'office' },
      { category: 'bathroom' },
      { category: 'random' },
    ]
    const scope = nock('http://localhost')
      .post('/gears/addCategoryForUser')
      .reply(200, fakeCategories)
    return addGearCategoryForUser().then((result) => {
      expect(result).toHaveLength(3)
      expect(result[2].category).toBe('random')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('addGearsForUser', () => {
  it('return all gear data after adding a gear', () => {
    const fakeGears = [
      { gear: 'pillow' },
      { gear: 'pot' },
      { gear: 'water filter' },
    ]
    const scope = nock('http://localhost')
      .post('/gears/addGearForUser')
      .reply(200, fakeGears)
    return addGearForUser().then((result) => {
      expect(result).toHaveLength(3)
      expect(result[1].gear).toBe('pot')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteGearForUser', () => {
  it('return all gear data after deleting a gear', () => {
    const fakeGears = [
      { gear: 'pillow' },
      { gear: 'pot' },
      { gear: 'water filter' },
    ]
    const scope = nock('http://localhost')
      .delete('/gears/deleteGear/2/1')
      .reply(200, fakeGears)
    return deleteGearForUser(2, 1).then((result) => {
      expect(result).toHaveLength(3)
      expect(result[0].gear).toBe('pillow')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteCategoryForUser', () => {
  it('return all categories after deleting a category', () => {
    const fakeCategories = [
      { category: 'others' },
      { category: 'bathroom' },
      { category: 'random' },
    ]
    const scope = nock('http://localhost')
      .delete('/gears/deleteCategory/2/1')
      .reply(200, fakeCategories)
    return deleteCategoryForUser(2, 1).then((result) => {
      expect(result).toHaveLength(3)
      expect(result[0].category).toBe('others')
      expect(scope.isDone()).toBe(true)
    })
  })
})
