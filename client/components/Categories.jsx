import React, { useEffect, useState } from 'react'
import Category from './Category'
import AddCategory from './AddCategory'

import { useSelector, useDispatch } from 'react-redux'
import { fetchGearCategoriesForUser } from '../actions/gearCategories'
import { fetchGearsForUser } from '../actions/gears'

export default function Categories() {
  const [addCategory, setAddCategory] = useState(false)
  const user = useSelector((state) => state.loggedInUser)
  const gearCategories = useSelector((state) => state.gearCategories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchGearCategoriesForUser(user.id))
    dispatch(fetchGearsForUser(user.id))
  }, [])

  function clickAddCategory() {
    setAddCategory(true)
  }

  return (
    <div className="px-5">
      {gearCategories.map((category) => {
        return (
          <div key={category.id}>
            <Category category={category} />
          </div>
        )
      })}
      <button
        onClick={clickAddCategory}
        className="btn rounded btn-accent hover:opacity-80 mt-5 mb-5 btn-sm"
      >
        Add new category
      </button>
      {addCategory && <AddCategory setAddCategoryStatus={setAddCategory} />}
    </div>
  )
}
