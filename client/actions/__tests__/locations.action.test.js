import { fetchLocations, UPDATE_LOCATION } from '../locations'
import { getLocations } from '../../apis/location'

jest.mock('../../apis/location')
jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})
afterEach(() => {
  console.error.mockReset()
})

const fakeDispatch = jest.fn()

describe('fetch locations', () => {
  it('dispatch updateLocation', () => {
    const mockLocations = ['Auckland', 'Christchurch']
    getLocations.mockReturnValue(Promise.resolve(mockLocations))
    const thunkFn = fetchLocations()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0]).toContain('Auckland')
      expect(fakeDispatchArgument.type).toBe(UPDATE_LOCATION)
    })
  })

  it('show error', () => {
    getLocations.mockImplementation(() =>
      Promise.reject(new Error('Locations failure'))
    )
    console.error.mockImplementation(() => {})
    return fetchLocations()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Locations failure')
    })
  })
})
