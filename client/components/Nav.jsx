import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="box has-text-centered has-background-primary">
      <div className="columns">
        <div className="column is-one-third">
          <h3 className="is-size-6">
            <Link to="/" style={{ color: '#1B303D' }}>
              Home
            </Link>
          </h3>
        </div>
        <div className="column is-one-third has-text-white">
          <h3 className="is-size-6">
            <Link to="/planner" style={{ color: '#1B303D' }}>
              Planner
            </Link>
          </h3>
        </div>
        <div className="column is-one-third">
          <h3 className="is-size-6">
            <Link to="/gears" style={{ color: '#1B303D' }}>
              Gears
            </Link>
          </h3>
        </div>
      </div>
    </nav>
  )
}
