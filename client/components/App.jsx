import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getGreeting } from '../apiClient'
import Home from './Home'
import Nav from './Nav'
import Header from './Header'
import Planner from './Planner'
import Gears from './Gears'

const App = () => {
  const [table, setTable] = useState([])
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/planner"
          element={
            <Planner tableData={{ table }} setTableFunction={{ setTable }} />
          }
        />
        <Route path="/gears" element={<Gears />} />
      </Routes>
    </div>
  )
}

export default App
