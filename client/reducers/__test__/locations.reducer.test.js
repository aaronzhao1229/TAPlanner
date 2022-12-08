import { updateLocation } from '../../actions/locations'
import locations from '../locations'

describe('location reducer', () => {
  test('update location', () => {
    const action = updateLocation(['Auckland', 'Christchurch'])
    const newState = locations([], action)
    expect(newState).toHaveLength(2)
  })

  test('default', () => {
    const action = { type: '', payload: 'random' }
    const oldState = locations('1223', action)
    expect(oldState).toBe('1223')
  })
})
