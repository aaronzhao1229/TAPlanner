import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'

import { useAuth0 } from '@auth0/auth0-react'

import LandingPage from '../LandingPage'

const testFunction = jest.fn()
jest.mock('@auth0/auth0-react')

useAuth0.mockReturnValue({
  isLoading: false,
  user: { sub: 'foobar' },
  isAuthenticated: true,
  loginWithRedirect: testFunction,
})

describe('<LandingPage />', () => {
  it('renders a button that has a <button> html tag and a class name', () => {
    render(<LandingPage />)
    const button = screen.getByRole('button', { name: /Sign Up/ })
    expect(button).toContainHTML('button')
    expect(button).toHaveClass('m-5')
    expect.assertions(2)
  })

  it('clicking button directs to auth0 page', () => {
    render(<LandingPage />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    expect(testFunction).toHaveBeenCalled()
  })
})
