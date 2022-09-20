const request = require('supertest')
const server = require('../../server')

const checkJwt = require('../../auth0')
const upload = require('../../multer')

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
const fakeMulter = (req, res, next) => {
  req.file = { filename: 'image' }
  next()
}

jest.mock('../../multer', () => {
  return { single: jest.fn().mockReturnValue(fakeMulter) }
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
    const fakeProfile = {}
    createProfile.mockReturnValue(Promise.resolve(fakeProfile))

    return request(server)
      .post('/users/createProfile', upload.single('image'))
      .send('auth0Id=123&firstName=Bobby&lastName=Wilson&location=Nelson')
      .then((res) => {
        expect(res.body.firstName).toBe('Bobby')
        expect(res.body).toHaveProperty('auth0Id')
      })
  })
})
