import React from 'react'
import { Link } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

export default function Nav() {
  const user = useSelector((state) => state.loggedInUser)
  const { logout, loginWithRedirect } = useAuth0()
  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }
  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <nav className="box has-text-centered has-background-primary">
      <div className="columns">
        <div className="column is-one-quarter">
          <h3 className="is-size-6">
            <Link to="/" style={{ color: '#1B303D' }}>
              Home
            </Link>
          </h3>
        </div>
        <div className="column is-one-quarter has-text-white">
          <h3 className="is-size-6">
            <Link to="/planner" style={{ color: '#1B303D' }}>
              Planner
            </Link>
          </h3>
        </div>
        <div className="column is-one-quarter">
          <h3 className="is-size-6">
            <Link to="/gears" style={{ color: '#1B303D' }}>
              Gears
            </Link>
          </h3>
        </div>

        <div className="column is-one-quarter">
          <h3 className="is-size-6">
            <IfAuthenticated>
              <Link to="/" onClick={handleLogOff} style={{ color: '#1B303D' }}>
                Log off
              </Link>
              <Link to="/singleProfile" style={{ color: '#1B303D' }}>
                {' ' + user.firstName}
              </Link>
            </IfAuthenticated>
            <IfNotAuthenticated>
              <Link to="/" onClick={handleSignIn} style={{ color: '#1B303D' }}>
                Sign In
              </Link>
            </IfNotAuthenticated>
          </h3>
        </div>
      </div>
    </nav>
  )
}
