import { fetchGearsForUser, SET_GEARS_SUCCESS } from '../gears'
import { getGearsForUser } from '../../apis/gear.api'

jest.mock('../../apis/gear.api')
jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  console.error.mockReset()
})

const fakeDispatch = jest.fn()
describe('fetchGearsForUser', () => {
  it('dispatch setGearsSuccess', () => {
    const fakeGears = [{ gear: 'stove' }, { gear: 'spork' }]
    getGearsForUser.mockReturnValue(Promise.resolve(fakeGears))
    const thunkFn = fetchGearsForUser()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0].gear).toBe('stove')
      expect(fakeDispatchArgument.type).toBe(SET_GEARS_SUCCESS)
    })
  })

  it('show error', () => {
    getGearsForUser.mockImplementation(() =>
      Promise.reject(new Error('failure'))
    )
    console.error.mockImplementation(() => {})
    return fetchGearsForUser()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('failure')
    })
  })
})
