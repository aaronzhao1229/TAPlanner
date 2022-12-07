import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLocations } from '../actions/locations'

export default function Location({ getLocationData }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const locations = useSelector((state) => state.locations)

  function handleChange(event) {
    setForm(event.target.value)
    dispatch(fetchLocations(event.target.value))
  }

  function handleSelect(index) {
    getLocationData(locations[index].formatted_address)
    setForm(locations[index].formatted_address)
    setShowOptions(false)
  }

  useEffect(() => {
    if (locations.length > 0 && !showOptions) {
      setShowOptions(true)
    }
    if (locations.length <= 0) {
      setShowOptions(false)
    }
  }, [locations])

  return (
    <div>
      <div className="relative">
        <label htmlFor="location" className="label">
          Location
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
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
                  onMouseDown={() => handleSelect(index)}
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
