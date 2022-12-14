import React, { useState } from 'react'
import { addGearCategory } from '../actions/gearCategories'
import { useSelector, useDispatch } from 'react-redux'
const initialFormData = {
  category: '',
}

export default function AddCategory(props) {
  const user = useSelector((state) => state.loggedInUser)
  const dispatch = useDispatch()
  const [form, setForm] = useState(initialFormData)
  const setAddCategory = props.setAddCategoryStatus
  const { category } = form
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const categoryToBeAdded = {
      category: category,
      userId: user.id,
    }
    dispatch(addGearCategory(categoryToBeAdded))
    setAddCategory(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category" className="label">
          Category
        </label>

        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="submit"
          className="btn rounded btn-warning hover:opacity-80 m-5  btn-sm"
        />
      </form>
    </div>
  )
}
