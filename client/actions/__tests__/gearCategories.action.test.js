import {
  getGearCategoriesForUser,
  addGearCategoryForUser,
  deleteCategoryForUser,
} from '../../apis/gear.api'
import {
  SET_GEARCATEGORIES_SUCCESS,
  fetchGearCategoriesForUser,
  addGearCategory,
  deleteCategory,
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

describe('addGearCategory', () => {
  it('return all category after adding a category', () => {
    const fakeCategories = [
      { category: 'office' },
      { category: 'bathroom' },
      { category: 'random' },
    ]
    addGearCategoryForUser.mockReturnValue(Promise.resolve(fakeCategories))
    const thunkFn = addGearCategory()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(3)
      expect(fakeDispatchArgument.payload[0].category).toBe('office')
      expect(fakeDispatchArgument.type).toBe(SET_GEARCATEGORIES_SUCCESS)
    })
  })

  it('show error', () => {
    addGearCategoryForUser.mockImplementation(() => {
      return Promise.reject(new Error('add category failure'))
    })
    console.error.mockImplementation(() => {})
    return addGearCategory()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('add category failure')
    })
  })
})

describe('deleteCategory', () => {
  it('return all categories after deleting category', () => {
    const fakeCategories = [{ category: 'random' }, { category: 'bathroom' }]
    deleteCategoryForUser.mockReturnValue(Promise.resolve(fakeCategories))
    return deleteCategory()(fakeDispatch).then(() => {
      const fakeDispatchArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchArgument.payload).toHaveLength(2)
      expect(fakeDispatchArgument.payload[0].category).toBe('random')
      expect(fakeDispatchArgument.type).toBe(SET_GEARCATEGORIES_SUCCESS)
    })
  })

  it('show error', () => {
    deleteCategoryForUser.mockImplementation(() => {
      return Promise.reject(new Error('delete category failure'))
    })
    console.error.mockImplementation(() => {})
    return deleteCategory()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('delete category failure')
    })
  })
})
