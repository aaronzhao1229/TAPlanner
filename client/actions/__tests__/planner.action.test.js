import {
  fetchRegions,
  SET_REGIONS_SUCCESS,
  fetchTracksByRegionId,
  fetchSectionsByTrackId,
  fetchStopsByTrackId,
  fetchPlansForUser,
  addNewPlanForUser,
  deletePlanForUser,
  SET_TRACKS_SUCCESS,
  SET_SECTIONS_SUCCESS,
  SET_STOPS_SUCCESS,
  SET_PLANS_SUCCESS,
} from '../planner'

import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getPlansForUser,
  addPlanForUser,
  deletePlan,
} from '../../apis/apiClient'

jest.mock('../../apis/apiClient')
jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})
afterEach(() => {
  console.error.mockReset()
})

const fakeDispatch = jest.fn()

describe('fetchRegions', () => {
  it('dispatches setRegionsSuccess', () => {
    const mockRegions = [{ name: 'Auckland' }, { name: 'Northland' }]
    getRegions.mockReturnValue(Promise.resolve(mockRegions))
    const thunkFn = fetchRegions()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0].name).toBe('Auckland')
      expect(fakeDispatchArgument.type).toBe(SET_REGIONS_SUCCESS)
    })
  })

  it('show error', () => {
    getRegions.mockImplementation(() => Promise.reject(new Error('failure')))
    console.error.mockImplementation(() => {})
    return fetchRegions()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('failure')
    })
  })
})

describe('fetchTracks', () => {
  it('dispatches setTracksSuccess', () => {
    const mockTracks = [{ name: 'Avalanche Peak' }, { name: 'Mount Herbert' }]
    getTracksByRegionId.mockReturnValue(Promise.resolve(mockTracks))
    const thunkFn = fetchTracksByRegionId()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0].name).toContain('Peak')
      expect(fakeDispatchArgument.type).toBe(SET_TRACKS_SUCCESS)
    })
  })

  it('show error', () => {
    getTracksByRegionId.mockImplementation(() =>
      Promise.reject(new Error('Track failure'))
    )
    console.error.mockImplementation(() => {})
    return fetchTracksByRegionId()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Track failure')
    })
  })
})

describe('fetchSectionsByTrackId', () => {
  it('dispatches setSectionsSuccess', () => {
    const mockSections = [
      { name: 'Picton to Anikiwa' },
      { name: 'St Arnaud to Arthurs Pass' },
    ]
    getSectionsByTrackId.mockReturnValue(Promise.resolve(mockSections))
    const thunkFn = fetchSectionsByTrackId()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0].name).toContain('Picton')
      expect(fakeDispatchArgument.type).toBe(SET_SECTIONS_SUCCESS)
    })
  })

  it('show error', () => {
    getSectionsByTrackId.mockImplementation(() =>
      Promise.reject(new Error('Section failure'))
    )
    console.error.mockImplementation(() => {})
    return fetchSectionsByTrackId()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Section failure')
    })
  })
})

describe('fetchStopsByTrackId', () => {
  it('dispatches setStopsSuccess', () => {
    const mockStops = [
      { name: 'Anikiwa' },
      { name: 'Arthurs Pass' },
      { name: 'Wanaka' },
    ]
    getStopsByTrackId.mockReturnValue(Promise.resolve(mockStops))
    const thunkFn = fetchStopsByTrackId()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(3)
      expect(fakeDispatchArgument.payload[0].name).toContain('Anikiwa')
      expect(fakeDispatchArgument.type).toBe(SET_STOPS_SUCCESS)
    })
  })

  it('show error', () => {
    getStopsByTrackId.mockImplementation(() =>
      Promise.reject(new Error('Stops failure'))
    )
    console.error.mockImplementation(() => {})
    return fetchStopsByTrackId()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Stops failure')
    })
  })
})

describe('fetchPlansForUser', () => {
  it('dispatches setPlansSuccess', () => {
    const mockPlans = [
      { day: 'Day 1', region: 'Canterbury' },
      { day: 'Day 2', region: 'Otago' },
    ]
    getPlansForUser.mockReturnValue(Promise.resolve(mockPlans))
    const thunkFn = fetchPlansForUser()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0].region).toContain('Canterbury')
      expect(fakeDispatchArgument.type).toBe(SET_PLANS_SUCCESS)
    })
  })

  it('show error', () => {
    getPlansForUser.mockImplementation(() =>
      Promise.reject(new Error('Plans failure'))
    )
    console.error.mockImplementation(() => {})
    return fetchPlansForUser()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Plans failure')
    })
  })
})

describe('addNewPlanForUser', () => {
  it('dispatches setPlansSuccess', () => {
    const mockPlans = [
      { day: 'Day 1', region: 'Canterbury' },
      { day: 'Day 2', region: 'Otago' },
      { day: 'Day 3', region: 'Southland' },
    ]
    addPlanForUser.mockReturnValue(Promise.resolve(mockPlans))
    const thunkFn = addNewPlanForUser()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(3)
      expect(fakeDispatchArgument.payload[2].region).toContain('Southland')
      expect(fakeDispatchArgument.type).toBe(SET_PLANS_SUCCESS)
    })
  })

  it('show error', () => {
    addPlanForUser.mockImplementation(() =>
      Promise.reject(new Error('add plans failure'))
    )
    console.error.mockImplementation(() => {})
    return addNewPlanForUser()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('add plans failure')
    })
  })
})

describe('deletePlanForUser', () => {
  it('dispatches setPlansSuccess', () => {
    const mockPlans = [
      { day: 'Day 2', region: 'Otago' },
      { day: 'Day 3', region: 'Southland' },
    ]
    deletePlan.mockReturnValue(Promise.resolve(mockPlans))
    const thunkFn = deletePlanForUser()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[1].region).toContain('Southland')
      expect(fakeDispatchArgument.type).toBe(SET_PLANS_SUCCESS)
    })
  })

  it('show error', () => {
    deletePlan.mockImplementation(() =>
      Promise.reject(new Error('delete plans failure'))
    )
    console.error.mockImplementation(() => {})
    return deletePlanForUser()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('delete plans failure')
    })
  })
})
