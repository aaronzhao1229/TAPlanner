import React, { useState, useEffect } from 'react'
import { getGreeting } from '../apiClient'

const App = () => {
  return (
    <div>
      <div
        className="hero p-5 has-text-centered"
        style={{ backgroundImage: `url('./images/header.jpeg')` }}
      >
        <h1 className="is-size-3">Te Araroa Planner</h1>
      </div>

      <nav className="box has-background-primary has-text-centered">
        <div className="columns">
          <div className="column is-one-third">Home</div>
          <div className="column is-one-third">Planner</div>
          <div className="column is-one-third">Gears</div>
        </div>
      </nav>

      <button>Click</button>
    </div>
  )
}

export default App
