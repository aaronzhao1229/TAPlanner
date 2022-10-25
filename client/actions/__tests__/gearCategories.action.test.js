import { getGearCategoriesForUser } from '../../apis/gear.api'
import {
  SET_GEARCATEGORIES_SUCCESS,
  fetchGearCategoriesForUser,
} from '../gearCategories'

jest.mock('../../apis/gear.api')
jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(() => {
  console.error.mockReset()
})

const fakeDispatch = jest.fn()

describe('fetchGearCategoriesForUser', () => {
  it('dispatch SET_GEARCATEGORIES_SUCCESS', () => {
    const mockCategories = [{ category: 'kitchen' }, { category: 'bathroom' }]
    getGearCategoriesForUser.mockReturnValue(Promise.resolve(mockCategories))
    const thunkFunc = fetchGearCategoriesForUser()
    return thunkFunc(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0].category).toBe('kitchen')
      expect(fakeDispatchArgument.type).toBe(SET_GEARCATEGORIES_SUCCESS)
    })
  })

  it('show error', () => {
    getGearCategoriesForUser.mockImplementation(() =>
      Promise.reject(new Error('failure'))
    )
    console.error.mockImplementation(() => {})
    return fetchGearCategoriesForUser()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('failure')
    })
  })
})