import {
  fetchGearsForUser,
  SET_GEARS_SUCCESS,
  addGear,
  deleteGear,
} from '../gears'
import {
  getGearsForUser,
  addGearForUser,
  deleteGearForUser,
} from '../../apis/gear.api'

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

describe('addGear', () => {
  it('dispatch setGearsForUser', () => {
    const fakeGears = [
      { gear: 'pillow' },
      { gear: 'pot' },
      { gear: 'water filter' },
    ]
    addGearForUser.mockReturnValue(Promise.resolve(fakeGears))
    const thunkFn = addGear()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(3)
      expect(fakeDispatchArgument.payload[0].gear).toBe('pillow')
      expect(fakeDispatchArgument.type).toBe(SET_GEARS_SUCCESS)
    })
  })

  it('show error', () => {
    addGearForUser.mockImplementation(() =>
      Promise.reject(new Error('add gear failure'))
    )
    console.error.mockImplementation(() => {})
    return addGear()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('add gear failure')
    })
  })
})

describe('deleteGear', () => {
  it('dispatch setGearsForUser', () => {
    const fakeGears = [{ gear: 'pillow' }, { gear: 'pot' }]
    deleteGearForUser.mockReturnValue(Promise.resolve(fakeGears))
    const thunkFn = deleteGear()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[1].gear).toBe('pot')
      expect(fakeDispatchArgument.type).toBe(SET_GEARS_SUCCESS)
    })
  })

  it('show error', () => {
    deleteGearForUser.mockImplementation(() =>
      Promise.reject(new Error('delete gear failure'))
    )
    console.error.mockImplementation(() => {})
    return deleteGear()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('delete gear failure')
    })
  })
})
