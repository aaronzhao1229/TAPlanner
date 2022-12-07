import Location from '../Locations'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchLocations } from '../../actions/locations'
const { screen, render } = require('@testing-library/react')
require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'

jest.mock('react-redux')
jest.mock('../../actions/locations')
const mockLocations = [
  { formatted_address: '518 Colombo Street' },
  { formatted_address: '400 Riccarton Road' },
]

const fakeDispatch = jest.fn()
fetchLocations.mockReturnValue(['mock1', 'mock2'])

describe('<Locations />', () => {
  it('render location form without options', () => {
    useSelector.mockReturnValue([])
    render(<Location getLocationData={jest.fn()} />)
    expect(screen.queryByTestId('test-container')).toBeFalsy()
  })

  it('render location form with options', async () => {
    useSelector.mockReturnValue(mockLocations)
    render(<Location getLocationData={jest.fn()} />)
    expect(screen.queryByTestId('test-container')).toBeTruthy()
  })

  it('type in the form and call dispatch function', async () => {
    useSelector.mockReturnValue(mockLocations)
    useDispatch.mockReturnValue(fakeDispatch)
    render(<Location getLocationData={jest.fn()} />)
    await userEvent.type(screen.getByTestId('test-location'), 'm')
    expect(fakeDispatch).toHaveBeenCalledWith(['mock1', 'mock2'])
  })

  it('click on one option and option container disappear', async () => {
    useSelector.mockReturnValue(mockLocations)
    useDispatch.mockReturnValue(fakeDispatch)
    render(<Location getLocationData={jest.fn()} />)
    await userEvent.click(screen.getByTestId('option1'))
    expect(screen.queryByTestId('test-container')).toBeFalsy()
    expect(screen.getByTestId('test-location').value).toBe('400 Riccarton Road')
  })
})
