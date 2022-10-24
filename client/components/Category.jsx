import React, { useEffect } from 'react'
import AddGear from './AddGear'
import { useSelector, useDispatch } from 'react-redux'

import { fetchGearsForUser } from '../actions/gears'

export default function Category({ category }) {
  let allWeight = 0
  let allPrice = 0
  let allQuantity = 0
  const user = useSelector((state) => state.loggedInUser)
  const gears = useSelector((state) => state.gears)
  const targetGears = gears.filter((gear) => gear.categoryId === category.id)
  targetGears.forEach((gear) => {
    allWeight += gear.weight
    allPrice += gear.price
    allQuantity += gear.quantity
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchGearsForUser(user.id))
  }, [])

  return (
    <div>
      <div className="pt-5 pl-2 text-lg font-bold">{category.category}</div>
      <div className="overflow-x-auto">
        <table
          id="geartable"
          className="table table-compact w-full border-separate"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Quantity</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {targetGears.map((gear) => {
              return (
                <tr key={gear.id}>
                  <td>{gear.gear}</td>
                  <td>{gear.description}</td>
                  <td>{gear.price}</td>
                  <td>{gear.weight}</td>
                  <td>{gear.quantity}</td>
                  <td>
                    <button className="btn btn-error btn-sm">Delete</button>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td></td>
              <td></td>
              <td>{allPrice}</td>
              <td>{allWeight}</td>
              <td>{allQuantity}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddGear />
    </div>
  )
}