import { fetchRegions, SET_REGIONS_SUCCESS } from '../planner'

import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getAllInfo,
} from '../../apis/apiClient'

jest.mock('../../apis/apiClient')

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
})
