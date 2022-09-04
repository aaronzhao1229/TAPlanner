import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import Nav from './Nav'
import Header from './Header'
import Planner from './Planner'
import Gears from './Gears'

const App = () => {
  const [table, setTable] = useState([])
  function updateTable(newData) {
    setTable(newData)
  }
  return (
    <div style={{ backgroundImage: `url('./images/header.jpeg')` }}>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
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
