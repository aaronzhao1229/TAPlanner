import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGearsForUser } from '../actions/gears'

export default function Gearitems() {
  const user = useSelector((state) => state.loggedInUser)
  const gears = useSelector((state) => state.gears)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchGearsForUser(user.id))
  })
  return (
    <div>
      {gears.map((gear) => {
        return <h2 key={gear.id}>{gear.gear}</h2>
      })}
    </div>
  )
}
