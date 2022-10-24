import React, { useEffect } from 'react'
import Category from './Category'

import { useSelector, useDispatch } from 'react-redux'
import { fetchGearCategoriesForUser } from '../actions/gearCategories'
import { fetchGearsForUser } from '../actions/gears'

export default function Categories() {
  const user = useSelector((state) => state.loggedInUser)
  const gearCategories = useSelector((state) => state.gearCategories)
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
            <Category category={category} />
          </div>
        )
      })}
    </div>
  )
}
