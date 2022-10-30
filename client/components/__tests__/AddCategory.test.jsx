import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'
import userEvent from '@testing-library/user-event'

import AddCategory from '../AddCategory'

jest.mock('react-redux')

const fakeFn = jest.fn()
const fakeDispatch = jest.fn()

useSelector.mockReturnValue({ id: 1 })
useDispatch.mockReturnValue(fakeDispatch)

describe('<AddCategory />', () => {
  it('render component', () => {
    render(<AddCategory setAddCategoryStatus={fakeFn} />)
    expect(screen.getByText(/category/i)).toBeInTheDocument()
  })

  it('click the button and fakeDispatch has been called', async () => {
    render(<AddCategory setAddCategoryStatus={fakeFn} />)
    await userEvent.type(screen.getByLabelText(/category/i), 'random')
    await userEvent.click(screen.getByRole('button'))
    expect(fakeDispatch).toHaveBeenCalledTimes(1)
  })
})
