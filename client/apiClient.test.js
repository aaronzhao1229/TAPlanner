import nock from 'nock'

import { getRegions } from './apiClient'

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
