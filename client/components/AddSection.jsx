import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchRegions,
  fetchTracksByRegionId,
  fetchSectionsByTrackId,
  fetchStopsByTrackId,
} from '../actions/planner'

import { getAllInfo } from '../apis/apiClient'
import { defaultValues } from '../helper'

const initialFormData = {
  day: '',
  additionalNotes: '',
}

let ids = { regionId: 1, trackId: 1, sectionId: 1, stopId: 1 }

export default function AddSection(props) {
  const dispatch = useDispatch()

  const updatedTable = props.updateTableData
  const [form, setForm] = useState(initialFormData)
  const { day, additionalNotes } = form

  const page = props.pageData
  const setPage = props.setPageFunction
  const updateTable = props.setTableFunction

  useEffect(() => {
    dispatch(fetchRegions())
    dispatch(fetchTracksByRegionId(ids.regionId))
    dispatch(fetchSectionsByTrackId(ids.trackId))
    dispatch(fetchStopsByTrackId(ids.trackId))
  }, [])

  const regions = useSelector((state) => state.regions)
  const tracks = useSelector((state) => state.tracks)
  const sections = useSelector((state) => state.sections)
  const stops = useSelector((state) => state.stops)

  function regionSelected(event) {
    let regionId = event.target.value
    ids['regionId'] = Number(regionId)
    defaultValues(ids)
    dispatch(fetchTracksByRegionId(ids['regionId']))
    dispatch(fetchSectionsByTrackId(ids['trackId']))
    dispatch(fetchStopsByTrackId(ids['trackId']))
  }

  function trackSelected(event) {
    let trackId = event.target.value
    ids['trackId'] = Number(trackId)
    dispatch(fetchSectionsByTrackId(ids['trackId']))
    dispatch(fetchStopsByTrackId(ids['trackId']))
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
        updateTable(updatedTable)
        setPage(page + 1)
      })
      .catch((err) => {
        console.error(err.message + 'Planner handleSummit')
      })
  }

  return (
    <>
      <div>
        <h3>
          <strong>Add a section</strong>
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="day">Day (eg. Day 1 or 03/09/2022)</label>
            <input
              type="text"
              id="day"
              name="day"
              value={day}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="region">Region</label>
            <div>
              <select onChange={regionSelected} id="region" name="region">
                {regions.map((region) => {
                  return (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="tracks">Track</label>
            <div>
              <select onChange={trackSelected} id="tracks" name="tracks">
                {tracks.map((track) => {
                  return (
                    <option key={track.id} value={track.id}>
                      {track.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="section">Section</label>
            <div>
              <select onChange={sectionSelected} id="sections" name="sections">
                {sections.map((section) => {
                  return (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="stops">Stop for the day</label>
            <div>
              <select onChange={stopSelected} id="stops" name="stops">
                {stops.map((stop) => {
                  return (
                    <option key={stop.id} value={stop.id}>
                      {stop.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="additionalNotes">Additional Notes</label>
            <input
              type="text"
              id="additionalNotes"
              name="additionalNotes"
              value={additionalNotes}
              onChange={handleChange}
            />
          </div>

          <input type="submit" />
        </form>
      </div>
    </>
  )
}
