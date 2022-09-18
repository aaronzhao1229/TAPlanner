import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LandingPage() {
  const { loginWithRedirect } = useAuth0()
  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect()
  }
  return (
    <>
      <div className="container has-text-centered">
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(/images/background.jpeg)` }}
        >
          <div className="box">
            <h1 className="is-size-3 has-text-white">Te Araroa Planner</h1>
          </div>
          <div className="flex">
            <button className="button" onClick={handleSignIn}>
              Sign Up
            </button>
            <button className="button" onClick={handleSignIn}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
