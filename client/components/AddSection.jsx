import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchRegions,
  fetchTracksByRegionId,
  fetchSectionsByTrackId,
  fetchStopsByTrackId,
} from '../actions/planner'

import { getAllInfo } from '../apis/apiClient'
import { addPlanForUser } from '../apis/user.api'
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
  const user = useSelector((state) => state.loggedInUser)
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
    const plan = { ...ids }
    plan.userId = user.id
    plan.day = day
    plan.additionalNotes = additionalNotes
    addPlanForUser(plan)
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
      <div className="hero">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="day" className="label">
              Day (eg. Day 1 or 03/09/2022)
            </label>
            <input
              type="text"
              data-testid="testDay"
              id="day"
              name="day"
              value={day}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label htmlFor="region" className="label">
              Region
            </label>
            <div>
              <select
                onChange={regionSelected}
                data-testid="testRegion"
                id="region"
                name="region"
                className="select select-primary w-full max-w-xs"
              >
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
            <label htmlFor="tracks" className="label">
              Track
            </label>
            <div>
              <select
                onChange={trackSelected}
                data-testid="testTracks"
                id="tracks"
                name="tracks"
                className="select select-primary w-full max-w-xs"
              >
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
            <label htmlFor="section" className="label">
              Section
            </label>
            <div>
              <select
                onChange={sectionSelected}
                data-testid="testSections"
                id="sections"
                name="sections"
                className="select select-primary w-full max-w-xs"
              >
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
            <label htmlFor="stops" className="label">
              Stop for the day
            </label>
            <div>
              <select
                onChange={stopSelected}
                data-testid="testStops"
                id="stops"
                name="stops"
                className="select select-primary w-full max-w-xs"
              >
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
            <label htmlFor="additionalNotes" className="label">
              Additional Notes
            </label>
            <input
              type="text"
              id="additionalNotes"
              name="additionalNotes"
              value={additionalNotes}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <input
            type="submit"
            className="btn rounded btn-primary hover:opacity-80 mt-5 mb-5"
          />
        </form>
      </div>
    </>
  )
}
