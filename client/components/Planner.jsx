import React, { useState } from 'react'
import { exportData } from '../helper'
import AddSection from './AddSection'
let updatedTable = []
export default function Planner(props) {
  const [page, setPage] = useState(0)
  const { table } = props.tableData
  const { updateTable } = props.setTableFunction
  function deletePlan(target) {
    const originalTableData = [...table]
    updatedTable = originalTableData.filter((r) => r.section !== target)
    updateTable(updatedTable)
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
                    <td>
                      <button
                        onClick={() => deletePlan(row.section)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              )
            })}
        </table>
      </div>
      <AddSection
        setTableFunction={updateTable}
        pageData={page}
        setPageFunction={setPage}
        updateTableData={updatedTable}
      />
    </>
  )
}
