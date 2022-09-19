const request = require('supertest')
const server = require('../../server')

const { getRegions } = require('../../db/db')

jest.mock('../../db/db')
jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('GET /planner/regions', () => {
  it('returns regions from db', () => {
    const fakeRegions = [
      { id: 1, name: 'Otago' },
      { id: 2, name: 'Southland' },
    ]
    getRegions.mockReturnValue(Promise.resolve(fakeRegions))
    return request(server)
      .get('/planner/regions')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].name).toBe('Southland')
      })
  })

  it('return status 500 and consoles error when problem', () => {
    getRegions.mockImplementation(() =>
      Promise.reject(new Error('it did not work'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/planner/regions')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('it did not work')
      })
  })
})
