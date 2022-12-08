import React from 'react'
import Categories from '../Categories'
import AddCategory from '../AddCategory'
import PieChart from '../PieChart'
import Category from '../Category'
import { useSelector, useDispatch } from 'react-redux'

import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('react-redux')
jest.mock('../PieChart')
jest.mock('../AddCategory')
jest.mock('../Category')

const fakeDispatch = jest.fn()
const fakeCategories = [
  {
    id: 1,
    category: 'random1',
  },
  {
    id: 2,
    category: 'random2',
  },
  {
    id: 3,
    category: 'random3',
  },
]

useDispatch.mockReturnValue(fakeDispatch)
useSelector.mockReturnValue(fakeCategories)
AddCategory.mockReturnValue(<h1>Please Add</h1>)
PieChart.mockReturnValue(<h2>Doughnut</h2>)
Category.mockReturnValue(<h3>Single Category</h3>)

describe('<Categories />', () => {
  it('render pieChart and Category', () => {
    render(<Categories />)
    expect(screen.getByText(/Doughnut/i)).toBeInTheDocument()
    expect(screen.getAllByText(/single/i)).toHaveLength(3)
  })

  it('click add button and AddCategory component appears', async () => {
    render(<Categories />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByText(/please add/i)).toBeInTheDocument()
  })
})
