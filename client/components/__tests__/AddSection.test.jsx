import React from 'react'
import AddSection from '../AddSection'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'
import userEvent from '@testing-library/user-event'

jest.mock('react-redux')

const mockRegions = [
  { id: 1, name: 'Canterbury' },
  { id: 2, name: 'Southland' },
]

describe('<AddSection />', () => {
  it('shows dropdown with all the options', () => {
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    useSelector.mockReturnValue(mockRegions)
    render(<AddSection />)
    // screen.debug()
    const options = screen.getAllByRole('option')

    expect(options).toHaveLength(8)
    expect(options[0]).toHaveTextContent('Canterbury')
  })

  it('select options', async () => {
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    useSelector.mockReturnValue(mockRegions)
    render(<AddSection />)

    await userEvent.type(screen.getByLabelText(/Additional/i), 'Expert')
    await userEvent.selectOptions(
      screen.getByTestId('testRegion'),
      'Canterbury'
    )
    await userEvent.selectOptions(
      screen.getByTestId('testTracks'),
      'Canterbury'
    )
    await userEvent.selectOptions(
      screen.getByTestId('testSections'),
      'Southland'
    )
    await userEvent.selectOptions(screen.getByTestId('testStops'), 'Southland')
    expect(screen.getAllByRole('option')[0].selected).toBe(true)
    expect(screen.getAllByRole('option')[1].selected).toBe(false)
    expect(screen.getAllByRole('option')[2].selected).toBe(true)
    expect(screen.getAllByRole('option')[5].selected).toBe(true)
    expect(screen.getAllByRole('option')[7].selected).toBe(true)
  })

  it('click the submit button', async () => {
    const fakeDispatch1 = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch1)
    useSelector.mockReturnValue(mockRegions)

    render(<AddSection />)
    await userEvent.type(screen.getByTestId('testDay'), 'Day 1')
    await userEvent.type(screen.getByLabelText(/Additional/i), 'Expert')

    await userEvent.click(screen.getByRole('button'))
    expect(fakeDispatch1).toHaveBeenCalledTimes(5)
  })
})
