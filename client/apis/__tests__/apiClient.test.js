import nock from 'nock'

import { getRegions, getTracksByRegionId } from '../apiClient'

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
  it('returns tracks by resion Id', () => {
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
