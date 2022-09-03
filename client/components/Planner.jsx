import React, { useEffect, useState } from 'react'
import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
} from '../apiClient'
const initialFormData = {
  day: '',
  additionalNotes: '',
}
const initialRegionId = 1
const initialTrackId = 1

export default function Planner() {
  const [form, setForm] = useState(initialFormData)
  const { day, additionalNotes } = form
  const [regionData, setRegionData] = useState([])
  const [tracksData, setTrackData] = useState([])
  const [sectionsData, setSectionsData] = useState([])
  const [stopsData, setStopsData] = useState([])

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
        return setSectionsData(sections)
      })
      .then(() => {
        return getStopsByTrackId(initialTrackId)
      })
      .then((stops) => {
        return setStopsData(stops)
      })
      .catch((err) => {
        console.error(err.message + 'Planner useEffect')
      })
  }, [])

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  console.log(form)

  function regionSelected(event) {
    let regionId = event.target.value
    getTracksByRegionId(regionId)
      .then((tracks) => {
        setTrackData(tracks)
      })
      .catch((err) => {
        console.error(err.message + 'regionSelected')
      })
  }

  function trackSelected(event) {
    let trackId = event.target.value
    getSectionsByTrackId(trackId)
      .then((sections) => {
        return setSectionsData(sections)
      })
      .then(() => {
        return getStopsByTrackId(trackId)
      })
      .then((stops) => {
        return setStopsData(stops)
      })
      .catch((err) => {
        console.error(err.message + 'trackSelected')
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
              Day (eg. day 1 or 03/09/2022)
            </label>
            <input
              className="input"
              type="text"
              id="day"
              name="day"
              value={day}
              onChange={handleChange}
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
                onChange={trackSelected}
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
            <div className="select">
              <select
                // onChange={sectionSelected}
                className="input"
                id="sections"
                name="sections"
              >
                {sectionsData.map((section) => {
                  return (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="column">
            <label htmlFor="stops" className="label">
              Stop for the day
            </label>
            <div className="select">
              <select
                // onChange={sectionSelected}
                className="input"
                id="stops"
                name="stops"
              >
                {stopsData.map((stop) => {
                  return (
                    <option key={stop.id} value={stop.id}>
                      {stop.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="column">
            <label htmlFor="additionalNotes" className="label">
              Additional Notes
            </label>
            <input
              className="input"
              type="text"
              id="additionalNotes"
              name="additionalNotes"
              value={additionalNotes}
              onChange={handleChange}
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
