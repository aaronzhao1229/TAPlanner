import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userEvent from '@testing-library/user-event'
import AddGear from '../AddGear'

jest.mock('react-redux')

const fakeFn = jest.fn()
const fakeDispatch = jest.fn()

useSelector.mockReturnValue({ id: 1 })
useDispatch.mockReturnValue(fakeDispatch)

describe('<AddGear />', () => {
  it('render component', () => {
    render(<AddGear setAddItemStatus={fakeFn} category={{ id: 2 }} />)
    expect(screen.getByText(/gear/i)).toBeInTheDocument()
  })

  it('click the button and fakeDispatch has been called', async () => {
    render(<AddGear setAddItemStatus={fakeFn} category={{ id: 2 }} />)
    await userEvent.type(screen.getByLabelText(/gear/i), 'lighter')
    await userEvent.click(screen.getByRole('button'))
    expect(fakeDispatch).toHaveBeenCalledTimes(1)
  })
})
