import React, { useEffect, useState } from 'react'
import {
  getRegions,
  getTracksByRegionId,
  getSectionsByTrackId,
  getStopsByTrackId,
  getAllInfo,
} from '../apiClient'
import AddSection from './AddSection'

export default function Planner(props) {
  const [page, setPage] = useState(0)
  const { table } = props.tableData
  const { setTable } = props.setTableFunction

  return (
    <>
      <table className="table container is-bordered">
        <thead>
          <tr>
            <th>Day</th>
            <th>Region</th>
            <th>Track</th>
            <th>Track Catogery</th>
            <th>Section</th>
            <th>Length</th>
            <th>Estimate time</th>
            <th>Section Note</th>
            <th>Stop for the day</th>
            <th>Resupply</th>
            <th>Addtional Note</th>
          </tr>
        </thead>
        {table.length !== 0 &&
          table.map((row) => {
            return (
              <tbody key={row.section}>
                <tr>
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
                </tr>
              </tbody>
            )
          })}
      </table>
      <AddSection
        setTableFunction={setTable}
        pageData={page}
        setPageFunction={setPage}
      />
    </>
  )
}
