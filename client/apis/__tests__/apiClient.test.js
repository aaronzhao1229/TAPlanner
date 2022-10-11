import nock from 'nock'

import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getPlansForUser,
  addPlanForUser,
  deletePlan,
} from '../apiClient'

describe('getRegions', () => {
  it('returns data from local api', () => {
    const scope = nock('http://localhost')
      .get('/planner/regions')
      .reply(200, { id: 1, name: 'canterbury' })
    return getRegions().then((result) => {
      expect(result.name).toContain('canterbury')
      expect(scope.isDone()).toBe(true)
    })
  })

  it('returns a string', () => {
    const scope = nock('http://localhost')
      .get('/planner/regions')
      .reply(200, JSON.stringify('region is canterbury'), {
        'Content-Type': 'apication/json',
      })
    return getRegions().then((result) => {
      expect(result).toContain('canterbury')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getTracksByRegionId', () => {
  it('returns tracks by region Id', () => {
    const scope = nock('http://localhost')
      .get('/planner/tracks/2')
      .reply(200, [
        { id: 3, name: 'Avalanche Peak' },
        { id: 4, name: 'Mount Herbert' },
      ])
    return getTracksByRegionId(2).then((result) => {
      expect(result).toHaveLength(2)
      expect(result[0].name).toContain('Peak')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getSectionsByTrackId', () => {
  it('returns sections by track Id', () => {
    const scope = nock('http://localhost')
      .get('/planner/sections/1')
      .reply(200, [
        { id: 3, name: 'School House Bay to Camp Bay' },
        { id: 4, name: 'BlackRock Campsite to Mahia Bay' },
      ])
    return getSectionsByTrackId(1).then((result) => {
      expect(result).toHaveLength(2)
      expect(result[0].name).toContain('Camp')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getStopsByTrackId', () => {
  it('returns sections by track Id', () => {
    const scope = nock('http://localhost')
      .get('/planner/stops/1')
      .reply(200, [
        { id: 1, name: 'School House Bay campsite' },
        { id: 2, name: 'Anikiwa' },
      ])
    return getStopsByTrackId(1).then((result) => {
      expect(result).toHaveLength(2)
      expect(result[0].name).toContain('House')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getPlansForUser', () => {
  it('returns plans by user Id', () => {
    const scope = nock('http://localhost')
      .get('/users/plans/getPlansForUser/1')
      .reply(200, [
        { id: 1, day: 'Day 1', time: '8 hours' },
        { id: 2, day: 'Day 2', time: '7 hours' },
      ])
    return getPlansForUser(1).then((result) => {
      expect(result).toHaveLength(2)
      expect(result[0].time).toContain('8')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('addPlansForUser', () => {
  it('returns plans with added plan', () => {
    const scope = nock('http://localhost')
      .post('/users/plans/addPlansForUser')
      .reply(200, [
        { id: 1, day: 'Day 1', time: '8 hours' },
        { id: 2, day: 'Day 2', time: '7 hours' },
        { id: 3, day: 'Day 3', time: '6 hours' },
      ])
    return addPlanForUser().then((result) => {
      expect(result).toHaveLength(3)
      expect(result[2].time).toContain('6')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deletePlan', () => {
  it('returns plans delete', () => {
    const scope = nock('http://localhost')
      .delete('/users/plans/deletePlans/1/1')
      .reply(200, [
        { id: 2, day: 'Day 2', time: '7 hours' },
        { id: 3, day: 'Day 3', time: '6 hours' },
      ])
    return deletePlan(1, 1).then((result) => {
      expect(result).toHaveLength(2)
      expect(result[0].time).toContain('7')
      expect(scope.isDone()).toBe(true)
    })
  })
})
