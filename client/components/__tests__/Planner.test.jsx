import React from 'react'
import AddSection from '../AddSection'
const { screen, render } = require('@testing-library/react')
require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'
import { useSelector, useDispatch } from 'react-redux'

jest.mock('../AddSection')
jest.mock('react-redux')

const fakeDispatch = jest.fn()
AddSection.mockReturnValue(<></>)

import Planner from '../Planner'

const fakePlan = [
  { day: 'Day 1', region: 'Canterbury' },
  { day: 'Day 2', region: 'Otago' },
]
useDispatch.mockReturnValue(fakeDispatch)
useSelector.mockReturnValue(fakePlan)

describe('Planner', () => {
  it('test if table is displayed', async () => {
    render(<Planner />)
    expect(screen.getByText(/canterbury/i)).toBeInTheDocument()
  })

  it('test if the table data has been delete after clicking delete button', async () => {
    render(<Planner />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])
    expect(fakeDispatch).toHaveBeenCalled()
  })
})
