import React from 'react'
import { useSelector } from 'react-redux'

export default function SingleProfile() {
  const user = useSelector((state) => state.loggedInUser)

  return (
    <div>
      <figure>
        <img src={user.image} alt={user.firstName} />
      </figure>
      <div>
        <h3>First Name: {user.firstName}</h3>
      </div>
      <div>
        <h3>Last Name: {user.lastName}</h3>
      </div>
      <div>
        <h3>Location: {user.location}</h3>
      </div>
    </div>
  )
}
