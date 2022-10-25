import React, { useState } from 'react'

const initialFormData = {
  name: '',
  description: '',
  price: 0,
  weight: 0,
  quantity: 0,
}

export default function AddGear(props) {
  const setAddItem = props.setAddItemStatus
  const [form, setForm] = useState(initialFormData)
  const { name, description, price, weight, quantity } = form

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setAddItem(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="label">
            Gear
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="description" className="label">
            Description
          </label>

          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="price" className="label">
            Price
          </label>

          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="weight" className="label">
            Weight
          </label>

          <input
            type="number"
            id="weight"
            name="weight"
            value={weight}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="label">
            Quantity
          </label>

          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <input
          type="submit"
          className="btn rounded btn-secondary hover:opacity-80 mt-5 mb-5 btn-sm"
        />
      </form>
    </div>
  )
}
