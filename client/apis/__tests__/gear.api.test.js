import nock from 'nock'

import { getGearsForUser, getGearCategoriesForUser } from '../gear.api'

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
