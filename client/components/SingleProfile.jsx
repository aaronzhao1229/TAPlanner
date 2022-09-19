import React from 'react'
import { useSelector } from 'react-redux'

export default function SingleProfile() {
  const user = useSelector((state) => state.loggedInUser)

  return (
    <div className="container has-text-centered">
      <figure className="image is-inline-block" style={{ width: '400px' }}>
        <img className="is-square" src={user.image} alt={user.firstName} />
      </figure>
      <div className="container mt-3">
        <h3 className="is-size-5">First Name: {user.firstName}</h3>
      </div>
      <div className="container mt-3">
        <h3 className="is-size-5">Last Name: {user.lastName}</h3>
      </div>
      <div className="container mt-3">
        <h3 className="is-size-5">Location: {user.location}</h3>
      </div>
    </div>
  )
}
