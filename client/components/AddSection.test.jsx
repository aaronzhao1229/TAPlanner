import React from 'react'
import AddSection from './AddSection'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
} from '../apiClient'
import { act } from 'react-dom/test-utils'

jest.mock('../apiClient')
const mockRegions = [
  { id: 1, name: 'Canterbury' },
  { id: 2, name: 'Southland' },
]

const mockTracks = [{ name: 'Avalanche Peak' }, { name: 'Longwood Forest' }]

const mockSections = [
  { name: 'Christchurch to Arthurs Pass' },
  { name: 'Christchurch to Arthurs Pass' },
]

const mockStops = [{ name: 'Christchurch' }, { name: 'Arthurs Pass' }]

describe('AddSection', () => {
  it('shows dropdown with all the options', async () => {
    await act(async () => {
      await getRegions.mockReturnValue(Promise.resolve(mockRegions))
      await getTracksByRegionId.mockReturnValue(Promise.resolve(mockTracks))
      await getSectionsByTrackId.mockReturnValue(Promise.resolve(mockSections))
      await getStopsByTrackId.mockReturnValue(Promise.resolve(mockStops))
      render(
        <AddSection
          setTableFunction={null}
          pageData={0}
          setPageFunction={null}
          updateTableData={[]}
        />
      )
    })
    // screen.debug()
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(8)
    expect(options[0]).toHaveTextContent('Canterbury')
  })
})
