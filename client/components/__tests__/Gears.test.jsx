import React from 'react'
import Gears from '../Gears'
import Categories from '../Categories'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('../Categories')

describe('<Gears />', () => {
  it('render Categories', () => {
    Categories.mockReturnValue(<h1>Hey</h1>)
    render(<Gears />)
    expect(screen.getByText(/hey/i)).toBeInTheDocument()
  })
})
