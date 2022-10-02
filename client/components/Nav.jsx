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
    <nav className="mb-5">
      <div className="grid grid-cols-4 gap-4 text-center bg-primary">
        <h3 className="btn btn-ghost normal-case text-xl">
          <Link to="/">Home</Link>
        </h3>

        <h3 className="btn btn-ghost normal-case text-xl">
          <Link to="/planner">Planner</Link>
        </h3>

        <h3 className="btn btn-ghost normal-case text-xl">
          <Link to="/gears">Gears</Link>
        </h3>

        <h3>
          <IfAuthenticated>
            <div className="btn btn-ghost normal-case text-xl">
              Logged in as
              <Link to="/singleProfile">{' ' + user.firstName}</Link>
            </div>
            <div className="btn btn-ghost normal-case text-xl">
              <Link to="/" onClick={handleLogOff}>
                Log off
              </Link>
            </div>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <Link to="/" onClick={handleSignIn}>
              Sign In
            </Link>
          </IfNotAuthenticated>
        </h3>
      </div>
    </nav>
  )
}
