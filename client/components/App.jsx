import React, { useState, useEffect } from 'react'
import { getGreeting } from '../apiClient'
import Home from './Home'
import Nav from './Nav'
import Header from './Header'

const App = () => {
  return (
    <div>
      <Header />
      <Nav />
      <Home />
      <button>Click</button>
    </div>
  )
}

export default App
