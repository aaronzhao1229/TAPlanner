import React from 'react'

const { screen, render } = require('@testing-library/react')
require('@testing-library/jest-dom')

import Planner from './Planner'

describe('Planner', () => {
  it('test if table is displayed', () => {
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
    // screen.debug()
    const table = screen.getByRole('table')
    expect(table).toHaveTextContent('canterbury')
  })
})
