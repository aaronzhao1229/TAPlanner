import React, { useEffect, useState } from 'react'
import { getRegions, getTracksByRegionId } from '../apiClient'

const initialRegionId = 1
const initialTrackId = 1
const intialSectionId = 1

export default function Planner() {
  const [regionData, setRegionData] = useState([])
  const [tracksData, setTrackData] = useState([])
  const [sectionsData, setSectionsData] = useState([])

  useEffect(() => {
    getRegions()
      .then((regions) => {
        return setRegionData(regions)
      })
      .then(() => {
        return getTracksByRegionId(initialRegionId)
      })
      .then((tracks) => {
        return setTrackData(tracks)
      })
      .then(() => {
        return getSectionsByTrackId(initialTrackId)
      })
      .then((sections) => {
        setSectionData(sections)
      })
  }, [])

  function regionSelected(event) {
    let regionId = event.target.value
    console.log(regionId)
    getTracksByRegionId(regionId).then((tracks) => {
      setTrackData(tracks)
    })
  }
  return (
    // form <-------
    <div className="container">
      <h3 className="is-size-5">
        <strong>Add a section</strong>
      </h3>
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
            <div className="select">
              <select
                onChange={regionSelected}
                className="input"
                id="region"
                name="region"
              >
                {regionData.map((region) => {
                  return (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="column">
            <label htmlFor="tracks" className="label">
              Track
            </label>
            <div className="select">
              <select
                // onChange={trackSelected}
                className="input"
                id="tracks"
                name="tracks"
              >
                {tracksData.map((track) => {
                  return (
                    <option key={track.id} value={track.id}>
                      {track.name}
                    </option>
                  )
                })}
              </select>
            </div>
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
    // form ------->
  )
}
