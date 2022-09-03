import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="box has-background-primary has-text-centered">
      <div className="columns">
        <div className="column is-one-third">
          <Link to="/">Home</Link>
        </div>
        <div className="column is-one-third">Planner</div>
        <div className="column is-one-third">
          <Link to="/gears">Gears</Link>
        </div>
      </div>
    </nav>
  )
}
