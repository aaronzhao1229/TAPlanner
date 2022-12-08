import gearCategories from '../gearCategories'

import { setGearCategoriesSuccess } from '../../actions/gearCategories'

describe('gearCategories reducer', () => {
  test('set gear categories success', () => {
    const action = setGearCategoriesSuccess({ category: 'kitchen' })
    const newState = gearCategories([], action)
    expect(newState.category).toBe('kitchen')
  })
  test('default', () => {
    const action = { type: '', payload: 'random again' }
    const oldState = gearCategories('00000', action)
    expect(oldState).toBe('00000')
  })
})
