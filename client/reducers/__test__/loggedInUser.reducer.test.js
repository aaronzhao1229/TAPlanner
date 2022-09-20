import user from '../loggedInUser'
import {
  updateLoggedInUser,
  clearLoggedInUser,
} from '../../actions/loggedInUser'

describe('loggedInUser reducer', () => {
  test('update loggedInUser', () => {
    const action = updateLoggedInUser({
      firstName: 'William',
    })
    const newState = user({ auth0Id: '123' }, action)
    expect(newState.auth0Id).toBe('123')
    expect(newState.firstName).toBe('William')
  })

  test('clear loggedInUser', () => {
    const action = clearLoggedInUser()
    const newState = user({ auth0Id: '123' }, action)
    expect(newState.auth0Id).toBe('')
  })
})
