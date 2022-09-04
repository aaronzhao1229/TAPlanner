import React, { useEffect, useState } from 'react'
import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getAllInfo,
} from '../apiClient'

const initialFormData = {
  day: '',
  additionalNotes: '',
}
const initialRegionId = 1
const initialTrackId = 1
let ids = { regionId: 1, trackId: 1, sectionId: 1, stopId: 1 }
const updatedTable = []
export default function AddSection(props) {
  const [form, setForm] = useState(initialFormData)
  const { day, additionalNotes } = form
  const [regionData, setRegionData] = useState([])
  const [tracksData, setTrackData] = useState([])
  const [sectionsData, setSectionsData] = useState([])
  const [stopsData, setStopsData] = useState([])

  const page = props.pageData
  const setPage = props.setPageFunction
  const setTable = props.setTableFunction

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

  function regionSelected(event) {
    let regionId = event.target.value

    ids['regionId'] = Number(regionId)

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
    ids['trackId'] = Number(trackId)
    console.log(ids)
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

  function sectionSelected(event) {
    let sectionId = event.target.value
    ids['sectionId'] = Number(sectionId)
  }

  function stopSelected(event) {
    let stopId = event.target.value
    ids['stopId'] = Number(stopId)
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    getAllInfo(ids.regionId, ids.trackId, ids.sectionId, ids.stopId)
      .then((res) => {
        res[0].day = day
        res[0].additionalNotes = additionalNotes
        updatedTable.push(res[0])
        setTable(updatedTable)
        setPage(page + 1)
      })
      .catch((err) => {
        console.error(err.message + 'Planner handleSummit')
      })
  }

  return (
    <>
      <div className="container">
        <h3 className="is-size-5">
          <strong>Add a section</strong>
        </h3>
        <form className="container" onSubmit={handleSubmit}>
          {/* <div className="columns"> */}
          {/* <div className="column"> */}
          <label htmlFor="day" className="label">
            Day (eg. Day 1 or 03/09/2022)
          </label>
          <input
            className="input"
            type="text"
            id="day"
            name="day"
            value={day}
            onChange={handleChange}
          />
          {/* </div> */}
          {/* <div className="column"> */}
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
          {/* </div> */}
          {/* <div className="column"> */}
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
          {/* </div> */}
          {/* <div className="column"> */}
          <label htmlFor="section" className="label">
            Section
          </label>
          <div className="select">
            <select
              onChange={sectionSelected}
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
          {/* </div> */}
          {/* <div className="column"> */}
          <label htmlFor="stops" className="label">
            Stop for the day
          </label>
          <div className="select">
            <select
              onChange={stopSelected}
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
          {/* </div> */}
          {/* <div className="column"> */}
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
          {/* </div> */}
          {/* </div> */}
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
    </>
  )
}