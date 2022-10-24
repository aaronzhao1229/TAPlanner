import React, { useEffect } from 'react'
import Category from './Category'
import Gearitems from './Gearitems'
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
    <div>
      {gearCategories.map((category) => {
        return (
          <div key={category.id}>
            <Category>
              <div>{category.category}</div>
              {gears.map((gear) => {
                return (
                  <div key={gear.id}>
                    {gear.categoryId === category.id ? (
                      <Gearitems key={gear.id}>{gear.gear}</Gearitems>
                    ) : null}
                  </div>
                )
              })}
            </Category>
          </div>
        )
      })}
    </div>
  )
}
