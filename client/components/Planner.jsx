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
      <div className="block has-text-right mr-4">
        <button className="button is-primary" onClick={exportData}>
          Export table
        </button>
      </div>
      <table className="table container is-bordered" id="datatable">
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
                      className="button is-warning"
                      onClick={() => deletePlan(row.section)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            )
          })}
      </table>
      <AddSection
        setTableFunction={updateTable}
        pageData={page}
        setPageFunction={setPage}
        updateTableData={updatedTable}
      />
    </>
  )
}
