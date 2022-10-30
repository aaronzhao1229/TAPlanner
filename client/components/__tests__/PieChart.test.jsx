import React from 'react'
import { useSelector } from 'react-redux'
import PieChart from '../PieChart'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-canvas-mock'
global.ResizeObserver = require('resize-observer-polyfill')

jest.mock('react-redux')
const fakeCategories = [
  {
    id: 1,
    category: 'random1',
  },
  {
    id: 2,
    category: 'random2',
  },
]
const fakeGears = [
  {
    gearId: 1,
    gear: 'pot',
    description: 'this is the gear',
    categoryId: 1,
    weight: 20,
    price: 50,
    quantity: 1,
  },
  {
    gearId: 2,
    gear: 'lighter',
    description: 'important',
    categoryId: 2,
    weight: 20,
    price: 3,
    quantity: 1,
  },
]

describe('<PieChart />', () => {
  it('render pie chart with mock values', () => {
    useSelector
      .mockReturnValueOnce(fakeCategories)
      .mockReturnValueOnce(fakeGears)
    render(<PieChart />)
    expect(screen.getByRole('img')).toBeTruthy()
  })
})
