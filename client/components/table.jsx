import React from 'react'
import { useSelector } from 'react-redux'
import { exportImageData } from '../helper'

export default function Table() {
  const user = useSelector((state) => state.loggedInUser)
  return (
    <>
      <div className="block has-text-right mr-4">
        <button className="button is-primary" onClick={exportImageData}>
          Export table
        </button>
      </div>
      <table className="table container is-bordered" id="imagedatatable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Profile</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.location}</td>
            <td>
              <img id="image1" src={user.image} alt={user.image} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
