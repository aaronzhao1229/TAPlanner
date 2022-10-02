import React from 'react'
import { useSelector } from 'react-redux'

export default function SingleProfile() {
  const user = useSelector((state) => state.loggedInUser)

  return (
    <div className="hero">
      <div className="card card-compact w-96 bg-base-200 shadow-xl m-6">
        <figure className="px-10 pt-10">
          <img src={user.image} alt={user.firstName} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
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
      </div>
    </div>
  )
}
