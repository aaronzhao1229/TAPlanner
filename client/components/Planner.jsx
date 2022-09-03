import React, { useState } from 'react'

export default function Planner() {
  // const [data, setData] = useState(initialData)

  return (
    <div>
      <h3>Add a section</h3>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div>
          <label htmlFor="day">Day</label>
          <input
            type="text"
            id="day"
            name="day"
            // value={day}
            // onChange={handleChange}
          />
          <label htmlFor="region">Rigion</label>
          <input
            type="text"
            id="region"
            name="region"
            // value={region}
            // onChange={handleChange}
          />
          <label htmlFor="track">Track</label>
          <input
            type="text"
            id="track"
            name="track"
            // value={track}
            // onChange={handleChange}
          />
          <label htmlFor="section">Section</label>
          <input
            type="text"
            id="section"
            name="section"
            // value={section}
            // onChange={handleChange}
          />
          <label htmlFor="stop">Stop for the day</label>
          <input
            type="text"
            id="stop"
            name="stop"
            // value={section}
            // onChange={handleChange}
          />
        </div>
        <input type="submit" />
        <button
        // onClick={(e) => {
        //   e.preventDefault()
        //   setData(initialData)
        // }}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}
