import React, { useEffect, useState } from 'react'
import AddGear from './AddGear'
import { useSelector, useDispatch } from 'react-redux'
import { FcAddRow } from 'react-icons/fc'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { fetchGearsForUser, deleteGear } from '../actions/gears'
import { deleteCategory } from '../actions/gearCategories'

export default function Category({ category }) {
  let allWeight = 0
  let allPrice = 0
  let allQuantity = 0

  const [additem, setAddItem] = useState(false)
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

  function clickAdd() {
    setAddItem(true)
  }

  function clickDelete(gearId) {
    dispatch(deleteGear(gearId, user.id))
  }

  function clickDeleteCategory() {
    dispatch(deleteCategory(category.id, user.id))
    dispatch(fetchGearsForUser(user.id))
  }

  return (
    <div>
      <div className="flex justify-between pt-5 pl-2 ">
        <div className="text-lg font-bold">{category.category}</div>
        <div>
          <button
            data-testid="delete-category"
            onClick={clickDeleteCategory}
            className="hover:bg-error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </div>
      </div>

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {targetGears.map((gear) => {
              return (
                <tr key={gear.gearId} className="hover">
                  <td>{gear.gear}</td>
                  <td>{gear.description}</td>
                  <td>{gear.price}</td>
                  <td>{gear.weight}</td>
                  <td>{gear.quantity}</td>
                  <td>
                    <button
                      data-testid="delete-item"
                      onClick={() => clickDelete(gear.gearId)}
                      className="hover:bg-error"
                    >
                      <RiDeleteBin2Fill />
                    </button>
                  </td>
                </tr>
              )
            })}

            <tr>
              <td>
                <button onClick={clickAdd} className="flex hover:bg-primary">
                  <FcAddRow /> Add new item
                </button>
              </td>
              <td></td>
              <td>{allPrice}</td>
              <td>{allWeight}</td>
              <td>{allQuantity}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {additem && (
          <AddGear setAddItemStatus={setAddItem} category={category} />
        )}
      </div>
    </div>
  )
}
