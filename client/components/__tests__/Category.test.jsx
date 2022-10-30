import React from 'react'
import AddGear from '../AddGear'
import Category from '../Category'
import { useSelector, useDispatch } from 'react-redux'

import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('react-redux')
jest.mock('../AddGear')
jest.mock('../../actions/gears')

const fakeDispatch = jest.fn()
const fakeGears = [
  {
    gearId: 1,
    gear: 'pot',
    description: 'this is the gear',
    categoryId: 1,
    weight: 20,
    price: 50,
    quantity: 1,
  },
  {
    gearId: 2,
    gear: 'lighter',
    description: 'important',
    categoryId: 2,
    weight: 20,
    price: 3,
    quantity: 1,
  },
  {
    gearId: 3,
    gear: 'spork',
    description: 'for meals',
    categoryId: 1,
    weight: 15,
    price: 13,
    quantity: 1,
  },
]

useSelector.mockReturnValue(fakeGears)
useDispatch.mockReturnValue(fakeDispatch)

describe('<Category />', () => {
  it('render gears', () => {
    render(<Category category={{ id: 1 }} />)
    expect(screen.getByText(/pot/i)).toBeInTheDocument()
  })

  it('click Add new item button and <AddGear /> component appear', async () => {
    AddGear.mockReturnValue(<button>New Gear</button>)
    render(<Category category={{ id: 1 }} />)
    await userEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(screen.getByText(/new gear/i)).toBeInTheDocument()
  })

  it('click delete gear and category buttons and fakeDispatch function has been called', async () => {
    render(<Category category={{ id: 1 }} />)
    await userEvent.click(screen.getAllByTestId('delete-item')[0])
    await userEvent.click(screen.getByTestId('delete-category'))
    expect(fakeDispatch).toHaveBeenCalledTimes(6)
  })
})
