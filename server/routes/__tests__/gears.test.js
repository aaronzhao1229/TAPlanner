const request = require('supertest')
const server = require('../../server')

const {
  getGears,
  getCategory,
  addCategory,
  addGear,
} = require('../../db/db.gears')

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

describe('POST /gears/addCategoryForUser', () => {
  it('return all categories after adding', () => {
    const fakeCategories = [
      { category: 'bathroom' },
      { category: 'office' },
      { category: 'random' },
    ]
    addCategory.mockReturnValue(Promise.resolve(fakeCategories))
    return request(server)
      .post('/gears/addCategoryForUser')
      .then((res) => {
        expect(res.body).toHaveLength(3)
        expect(res.body[2].category).toBe('random')
      })
  })

  it('show error', () => {
    addCategory.mockImplementation(() =>
      Promise.reject(new Error('add failure'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/gears/addCategoryForUser')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('add failure')
      })
  })
})

describe('POST /gears/addGearForUser', () => {
  it('return all gears after adding', () => {
    const fakeGears = [
      { gear: 'stove', weight: 80 },
      { gear: 'spork', weight: 15 },
    ]
    addGear.mockReturnValue(Promise.resolve(fakeGears))
    return request(server)
      .post('/gears/addGearForUser')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].weight).toBe(15)
      })
  })

  it('show error', () => {
    addGear.mockImplementation(() =>
      Promise.reject(new Error('add gear failure'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/gears/addGearForUser')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('add gear failure')
      })
  })
})
