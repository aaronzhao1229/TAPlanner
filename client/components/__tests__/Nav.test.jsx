import React from 'react'

import { screen, render } from '@testing-library/react'
require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'
import { useSelector } from 'react-redux'
import Nav from '../Nav'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'

jest.mock('@auth0/auth0-react')
jest.mock('react-redux')

const testFunction = jest.fn()
useAuth0.mockReturnValue({
  isAuthenticated: true,
  logout: testFunction,
  loginWithRedirect: testFunction,
})

useSelector.mockReturnValue({ firstName: 'Will' })

describe('<Nav />', () => {
  test('firstName shown on Nav bar', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )
    expect(screen.getByText(/will/i)).toBeInTheDocument()
  })

  test('click log off', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Nav />} />
        </Routes>
      </MemoryRouter>
    )
    await userEvent.click(screen.getByText(/log off/i))
    expect(testFunction).toHaveBeenCalledTimes(1)
  })

  test('click sign in', async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: testFunction,
      loginWithRedirect: testFunction,
    })
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Nav />} />
        </Routes>
      </MemoryRouter>
    )
    await userEvent.click(screen.getByText(/sign in/i))
    expect(testFunction).toHaveBeenCalledTimes(2)
  })
})
