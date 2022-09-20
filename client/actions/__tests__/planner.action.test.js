import {
  fetchRegions,
  SET_REGIONS_SUCCESS,
  fetchTracksByRegionId,
  SET_TRACKS_SUCCESS,
} from '../planner'

import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getAllInfo,
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
      expect(0).toBe(0)
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