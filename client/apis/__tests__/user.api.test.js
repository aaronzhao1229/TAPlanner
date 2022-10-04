import nock from 'nock'
import { getUser, uploadProfile } from '../user.api'

describe('getUser', () => {
  it('returns user data from local api', () => {
    const scope = nock('http://localhost')
      .get(`/users/singleUser`)
      .reply(200, { id: 1, firstName: 'Will' })
    return getUser().then((result) => {
      expect(result.firstName).toBe('Will')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('uploadProfile', () => {
  it('returns profile data from local api', () => {
    const scope = nock('http://localhost')
      .post('/users/createProfile')
      .reply(200, { id: 1, firstName: 'Clara' })
    return uploadProfile().then((result) => {
      expect(result.firstName).toBe('Clara')
      expect(scope.isDone()).toBe(true)
    })
  })
})
