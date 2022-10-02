import React from 'react'
import AddSection from '../AddSection'
const { screen, render } = require('@testing-library/react')
require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'

jest.mock('../AddSection')
AddSection.mockReturnValue(<></>)
import Planner from '../Planner'
const fakeFunc = jest.fn()

describe('Planner', () => {
  it('test if table is displayed', async () => {
    render(
      <Planner
        tableData={{
          table: [
            {
              day: '1',
              region: 'canterbury',
              track: 'Avalanche Peak',
              category: 'expert',
            },
          ],
        }}
        setTableFunction={{ updateTable: null }}
      />
    )
    const table = screen.getByRole('table')
    expect(table).toHaveTextContent('canterbury')
  })

  it('test if the table data has been delete after clicking delete button', async () => {
    render(
      <Planner
        tableData={{
          table: [
            {
              day: '1',
              region: 'canterbury',
              track: 'Avalanche Peak',
              category: 'expert',
              section: 'Arthurs Pass to Peak',
            },
          ],
        }}
        setTableFunction={{ updateTable: fakeFunc }}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(fakeFunc).toHaveBeenCalled()
  })
})
