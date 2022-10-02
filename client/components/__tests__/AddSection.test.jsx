import React from 'react'
import AddSection from '../AddSection'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'
import userEvent from '@testing-library/user-event'
import { getAllInfo } from '../../apis/apiClient'

jest.mock('../../apis/apiClient')
jest.mock('react-redux')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

const mockRegions = [
  { id: 1, name: 'Canterbury' },
  { id: 2, name: 'Southland' },
]

const mockAllInfo = [
  {
    region: 'Otago',
    track: 'Motatapu',
  },
]
const fakeFunc = jest.fn()
describe('<AddSection />', () => {
  it('shows dropdown with all the options', () => {
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    useSelector.mockReturnValue(mockRegions)
    render(
      <AddSection
        setTableFunction={fakeFunc}
        pageData={0}
        setPageFunction={null}
        updateTableData={[]}
      />
    )
    // screen.debug()
    const options = screen.getAllByRole('option')

    expect(options).toHaveLength(8)
    expect(options[0]).toHaveTextContent('Canterbury')
  })

  it('select options', async () => {
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    useSelector.mockReturnValue(mockRegions)
    render(
      <AddSection
        setTableFunction={null}
        pageData={0}
        setPageFunction={null}
        updateTableData={[]}
      />
    )

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
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    useSelector.mockReturnValue(mockRegions)
    getAllInfo.mockReturnValue(Promise.resolve(mockAllInfo))
    render(
      <AddSection
        setTableFunction={fakeFunc}
        pageData={0}
        setPageFunction={fakeFunc}
        updateTableData={[]}
      />
    )
    await userEvent.type(screen.getByTestId('testDay'), 'Day 1')
    await userEvent.type(screen.getByLabelText(/Additional/i), 'Expert')

    await userEvent.click(screen.getByRole('button'))
    expect(fakeFunc).toHaveBeenCalledTimes(2)
  })

  it('console error', async () => {
    const fakeDispatch = jest.fn()
    useDispatch.mockReturnValue(fakeDispatch)
    useSelector.mockReturnValue(mockRegions)
    getAllInfo.mockImplementation(() =>
      Promise.reject(new Error('something wrong'))
    )
    console.error.mockImplementation(() => {})
    render(
      <AddSection
        setTableFunction={fakeFunc}
        pageData={0}
        setPageFunction={fakeFunc}
        updateTableData={[]}
      />
    )

    await userEvent.click(screen.getByRole('button'))
    expect(console.error).toHaveBeenCalledWith(
      'something wrongPlanner handleSummit'
    )
  })
})
