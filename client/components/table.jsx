import React from 'react'
import { useSelector } from 'react-redux'

export default function Table() {
  const user = useSelector((state) => state.loggedInUser)
  return (
    <table className="table container is-bordered" id="datatable">
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
            <img src={user.image} alt={user.image} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
