import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import Nav from './Nav'
import Header from './Header'
import Planner from './Planner'
import Gears from './Gears'

import SignIn from './SignIn'

const App = () => {
  const [table, setTable] = useState([])
  function updateTable(newData) {
    setTable(newData)
  }
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/planner"
          element={
            <Planner tableData={{ table }} setTableFunction={{ updateTable }} />
          }
        />
        <Route path="/gears" element={<Gears />} />
      </Routes>
    </div>
  )
}

export default App
