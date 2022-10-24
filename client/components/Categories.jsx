import React, { useEffect } from 'react'
import Category from './Category'
import AddGear from './AddGear'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGearCategoriesForUser } from '../actions/gearCategories'
import { fetchGearsForUser } from '../actions/gears'

export default function Categories() {
  const user = useSelector((state) => state.loggedInUser)
  const gearCategories = useSelector((state) => state.gearCategories)
  const gears = useSelector((state) => state.gears)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchGearCategoriesForUser(user.id))
    dispatch(fetchGearsForUser(user.id))
  }, [])

  return (
    <div className="px-5">
      {gearCategories.map((category) => {
        return (
          <div key={category.id}>
            <Category>
              <div className="pt-5 pl-2 text-lg font-bold">
                {category.category}
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
                      <th>Delete?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gears.length !== 0 &&
                      gears
                        .filter((gear) => gear.categoryId === category.id)
                        .map((gear) => {
                          return (
                            <tr key={gear.id}>
                              <td>{gear.gear}</td>
                              <td>{gear.description}</td>
                              <td>{gear.price}</td>
                              <td>{gear.weight}</td>
                              <td>{gear.quantity}</td>
                              <td>
                                <button className="btn btn-error btn-sm">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                  </tbody>
                </table>
              </div>
              <AddGear />
            </Category>
          </div>
        )
      })}
    </div>
  )
}
