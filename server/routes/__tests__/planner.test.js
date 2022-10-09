const request = require('supertest')
const server = require('../../server')

const {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
} = require('../../db/db')

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

describe('GET /planner/tracks/:regionId', () => {
  it('returns tracks', () => {
    const fakeTracks = [
      { id: 1, name: 'Avalanche Peak' },
      { id: 2, name: 'Mount Bealey' },
    ]
    getTracksByRegionId.mockReturnValue(Promise.resolve(fakeTracks))
    return request(server)
      .get('/planner/tracks/1')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].name).toContain('Bealey')
      })
  })

  it('return status 500 and consoles error when problem', () => {
    getTracksByRegionId.mockImplementation(() =>
      Promise.reject(new Error('it did not work 1'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/planner/tracks/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('it did not work 1')
      })
  })
})

describe('GET /planner/sections/:trackId', () => {
  it('returns sections', () => {
    const fakeSections = [
      { id: 1, name: 'Queenstown to Glenorchy' },
      { id: 2, name: 'Colac Bay to Riverton' },
    ]
    getSectionsByTrackId.mockReturnValue(Promise.resolve(fakeSections))
    return request(server)
      .get('/planner/sections/1')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].name).toContain('Riverton')
      })
  })

  it('return status 500 and consoles error when problem', () => {
    getSectionsByTrackId.mockImplementation(() =>
      Promise.reject(new Error('it did not work 2'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/planner/sections/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('it did not work 2')
      })
  })
})

describe('GET /planner/stops/:trackId', () => {
  it('returns stops', () => {
    const fakeSections = [
      { id: 1, name: 'Nelson' },
      { id: 2, name: 'St Arnaud' },
    ]
    getStopsByTrackId.mockReturnValue(Promise.resolve(fakeSections))
    return request(server)
      .get('/planner/stops/1')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].name).toContain('Arnaud')
      })
  })

  it('return status 500 and consoles error when problem', () => {
    getStopsByTrackId.mockImplementation(() =>
      Promise.reject(new Error('it did not work 3'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/planner/stops/1')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('it did not work 3')
      })
  })
})
