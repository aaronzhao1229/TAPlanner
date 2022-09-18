import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Header from './Header'
import Planner from './Planner'
import Gears from './Gears'

import SignIn from './SignIn'
import SingleProfile from './SingleProfile'

const App = () => {
  const [table, setTable] = useState([])
  function updateTable(newData) {
    setTable(newData)
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route
          path="/planner"
          element={
            <>
              <Header />
              <Nav />
              <Planner
                tableData={{ table }}
                setTableFunction={{ updateTable }}
              />
            </>
          }
        />
        <Route
          path="/gears"
          element={
            <>
              <Header />
              <Nav />
              <Gears />
            </>
          }
        />
        <Route
          path="/singleProfile"
          element={
            <>
              <Header />
              <Nav />
              <SingleProfile />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
