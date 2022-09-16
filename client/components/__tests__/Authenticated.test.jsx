import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('@auth0/auth0-react')

afterEach(() => {
  useAuth0.mockClear()
})

describe('Authentication', () => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
  })
  it('render children', () => {
    render(
      <IfAuthenticated>
        <button>authenticated</button>
      </IfAuthenticated>
    )
    const button = screen.getByRole('button')
    expect(button).toContainHTML('authenticated')
  })
})

// describe('Not Authentication', () => {
//   useAuth0.mockReturnValue({
//     isAuthenticated: false,
//   })
//   it('render children', () => {
//     render(
//       <IfNotAuthenticated>
//         <button>Not authenticated</button>
//       </IfNotAuthenticated>
//     )
//     const button = screen.getByRole('button')
//     expect(button).toContainHTML('Not authenticated')
//   })
// })
