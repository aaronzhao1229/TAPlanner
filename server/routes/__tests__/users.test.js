const request = require('supertest')
const server = require('../../server')

const checkJwt = require('../../auth0')
const multer = require('multer')
import { getUserById, createProfile } from '../../db/db.users'

jest.mock('../../db/db.users')
jest.mock('../../auth0')
jest.spyOn(console, 'error')

beforeAll(() => {
  checkJwt.mockImplementation((req, res, next) => {
    req.auth = { sub: 'testUserId' }
    next()
  })
})

afterEach(() => {
  console.error.mockReset()
})

describe('GET /users/singleUser', () => {
  it('return the user', () => {
    const fakeUser = { id: 1, name: 'Jason', auth0Id: 'auth123' }
    getUserById.mockReturnValue(Promise.resolve(fakeUser))
    return request(server)
      .get('/users/singleUser', checkJwt)
      .set('Authorization', `Bearer 123`)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.name).toBe('Jason')
      })
  })

  it('return status 500 and console errors when there is a problem', () => {
    getUserById.mockImplementation(() =>
      Promise.reject(new Error('it did not work'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/users/singleUser', checkJwt)
      .set('Authorization', `Bearer 123`)
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('it did not work')
      })
  })
})

describe('POST /users/createProfile', () => {
  it('return the new profile', () => {
    const fakeProfile = { id: 1, firstName: 'Jason' }
    createProfile.mockReturnValue(Promise.resolve(fakeProfile))
  })
})
