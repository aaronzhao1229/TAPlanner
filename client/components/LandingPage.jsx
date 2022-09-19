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
      <section
        className="hero is-fullheight"
        style={{ backgroundImage: `url(/images/background.jpeg)` }}
      >
        <div className="hero-body">
          <div className="container has-text-centered">
            <button
              className="button is-large m-5 is-primary"
              onClick={handleSignIn}
            >
              Sign Up
            </button>
            <button
              className="button is-large m-5 is-primary"
              onClick={handleSignIn}
            >
              Log In
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage
