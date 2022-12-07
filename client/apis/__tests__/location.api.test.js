import nock from 'nock'

import { getLocations } from '../location'

const fakeLocations = ['Auckland', 'Christchurch']

test('return location from api on server side', () => {
  const scope = nock('http://localhost')
    .get('/location')
    .query({ text: 'u' })
    .reply(200, fakeLocations)

  return getLocations('u').then((result) => {
    expect(scope.isDone()).toBe(true)
    expect(result).toHaveLength(2)
  })
})
