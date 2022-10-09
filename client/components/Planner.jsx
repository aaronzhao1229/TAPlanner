import React, { useEffect } from 'react'
import { exportData } from '../helper'
import AddSection from './AddSection'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlansForUser, deletePlanForUser } from '../actions/planner'

export default function Planner() {
  const user = useSelector((state) => state.loggedInUser)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPlansForUser(user.id))
  }, [])
  const plans = useSelector((state) => state.plans)

  function deletePlan(target) {
    dispatch(deletePlanForUser(target, user.id))
  }

  return (
    <>
      <div className="hero mb-4">
        <button onClick={exportData} className="btn btn-secondary btn-sm">
          Export table
        </button>
      </div>
      <div className="overflow-x-auto">
        <table id="datatable" className="table table-compact w-full">
          <thead>
            <tr>
              <th>Day</th>
              <th>Region</th>
              <th>Track</th>
              <th>Track Catogery</th>
              <th>Section</th>
              <th>Length</th>
              <th>Estimated time</th>
              <th>Section Note</th>
              <th>Stop for the day</th>
              <th>Resupply</th>
              <th>Addtional Note</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {plans.length !== 0 &&
              plans.map((row) => {
                return (
                  <tr key={row.planId}>
                    <td>{row.day}</td>
                    <td>{row.region}</td>
                    <td>{row.track}</td>
                    <td>{row.category}</td>
                    <td>{row.section}</td>
                    <td>{row.length}</td>
                    <td>{row.time}</td>
                    <td>{row.notes}</td>
                    <td>{row.stop}</td>
                    <td>{row.resupply}</td>
                    <td>{row.additionalNotes}</td>
                    <td>
                      <button
                        onClick={() => deletePlan(row.planId)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <AddSection />
    </>
  )
}
