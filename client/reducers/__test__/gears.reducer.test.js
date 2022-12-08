import gears from '../gears'

import { setGearsSuccess } from '../../actions/gears'

describe('gears reducer', () => {
  test('set gears success', () => {
    const action = setGearsSuccess({ gear: 'sleeping pad' })
    const newState = gears([], action)
    expect(newState.gear).toBe('sleeping pad')
  })
  test('default', () => {
    const action = { type: '', payload: 'random' }
    const oldState = gears('hey', action)
    expect(oldState).toBe('hey')
  })
})
