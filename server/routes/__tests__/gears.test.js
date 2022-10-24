const request = require('supertest')
const server = require('../../server')

const { getGears, getCategory } = require('../../db/db.gears')

jest.mock('../../db/db.gears')
jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('GET /gears/getgears/:userId', () => {
  it('return gears from db', () => {
    const fakeGears = [
      { gear: 'stove', price: 50 },
      { gear: 'spork', price: 15 },
    ]
    getGears.mockReturnValue(Promise.resolve(fakeGears))
    return request(server)
      .get('/gears/getgears/1')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].gear).toBe('spork')
      })
  })

  it('return status 500 and consoles error when problem', () => {
    getGears.mockImplementation(() => Promise.reject(new Error('failure')))
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/gears/getgears/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('failure')
      })
  })
})

describe('GET /gears/getGearCategories/:userId', () => {
  it('return category from db', () => {
    const fakeCategories = [{ category: 'bathroom' }, { category: 'office' }]
    getCategory.mockReturnValue(Promise.resolve(fakeCategories))
    return request(server)
      .get('/gears/getGearCategories/1')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].category).toBe('office')
      })
  })

  it('return status 500 and consoles error when problem', () => {
    getCategory.mockImplementation(() =>
      Promise.reject(new Error('failure again'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/gears/getGearCategories/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('failure again')
      })
  })
})
