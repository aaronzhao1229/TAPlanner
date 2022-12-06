import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLocations } from '../actions/locations'

export default function Location() {
  const dispatch = useDispatch()
  const [form, setForm] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const locations = useSelector((state) => state.locations)

  function handleChange(event) {
    setForm(event.target.value)
    if (event.target.value.length > 3) {
      dispatch(fetchLocations(event.target.value))
    }
  }

  useEffect(() => {
    if (locations.length > 0 && !showOptions) {
      setShowOptions(true)
    }
    if (locations.length <= 0) {
      setShowOptions(false)
    }
  }, [form])

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative">
        <input
          type="text"
          className="rounded-full border-2"
          name="location"
          onChange={handleChange}
          value={form}
          placeholder="Search your query ..."
        />
        {/* search result container */}
        {showOptions && (
          <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-52 overflow-y-auto">
            {locations.map((item, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                >
                  {item.formatted_address}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
