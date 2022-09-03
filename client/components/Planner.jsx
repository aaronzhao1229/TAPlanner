import React, { useState } from 'react'

export default function Planner() {
  // const [data, setData] = useState(initialData)

  return (
    <div className="container">
      <h3>Add a section</h3>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div className="columns">
          <div className="column">
            <label htmlFor="day" className="label">
              Day
            </label>
            <input
              className="input"
              type="text"
              id="day"
              name="day"
              // value={day}
              // onChange={handleChange}
            />
          </div>
          <div className="column">
            <label htmlFor="region" className="label">
              Rigion
            </label>
            <input
              className="input"
              type="text"
              id="region"
              name="region"
              // value={region}
              // onChange={handleChange}
            />
          </div>
          <div className="column">
            <label htmlFor="track" className="label">
              Track
            </label>
            <input
              className="input"
              type="text"
              id="track"
              name="track"
              // value={track}
              // onChange={handleChange}
            />
          </div>
          <div className="column">
            <label htmlFor="section" className="label">
              Section
            </label>
            <input
              className="input"
              type="text"
              id="section"
              name="section"
              // value={section}
              // onChange={handleChange}
            />
          </div>
          <div className="column">
            <label htmlFor="stop" className="label">
              Stop for the day
            </label>
            <input
              className="input"
              type="text"
              id="stop"
              name="stop"
              // value={section}
              // onChange={handleChange}
            />
          </div>
        </div>
        <input className="button is-primary mr-5" type="submit" />
        <button
          className="button is-warning"
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
