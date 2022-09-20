import React from 'react'
import AddSection from '../AddSection'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'

jest.mock('../../apis/apiClient')
jest.mock('react-redux')

const mockRegions = [
  { id: 1, name: 'Canterbury' },
  { id: 2, name: 'Southland' },
]

describe('<AddSection />', () => {
  it('shows dropdown with all the options', async () => {
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
    // screen.debug()
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(8)
    expect(options[0]).toHaveTextContent('Canterbury')
  })
})
