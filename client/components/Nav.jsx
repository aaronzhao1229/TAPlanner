import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="box has-text-centered ml-5 mr-5">
      <div className="columns">
        <div className="column is-one-third">
          <Link to="/">Home</Link>
        </div>
        <div className="column is-one-third">
          <Link to="/planner">Planner</Link>
        </div>
        <div className="column is-one-third">
          <Link to="/gears">Gears</Link>
        </div>
      </div>
    </nav>
  )
}
