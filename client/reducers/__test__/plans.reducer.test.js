import plans from '../plans'

import { setPlansSuccess } from '../../actions/planner'

describe('plans reducer', () => {
  test('set plans success', () => {
    const action = setPlansSuccess({ day: 'Day 1' })
    const newState = plans({ day: '' }, action)
    expect(newState.day).toBe('Day 1')
  })

  test('default', () => {
    const action = { type: '', payload: '123' }
    const oldState = plans('123456', action)
    expect(oldState).toBe('123456')
  })
})
