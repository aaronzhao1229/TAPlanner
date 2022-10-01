import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Header from './Header'
import Planner from './Planner'
import Gears from './Gears'

import SingleProfile from './SingleProfile'
import LandingPage from './LandingPage'
import Home from './Home'
import CreateProfile from './CreatProfile'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

const App = () => {
  const [table, setTable] = useState([])
  function updateTable(newData) {
    setTable(newData)
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <IfAuthenticated>
                <Home />
              </IfAuthenticated>
              <IfNotAuthenticated>
                <Header />
                <LandingPage />
              </IfNotAuthenticated>
            </>
          }
        />

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
        <Route path="/createProfile" element={<CreateProfile />} />
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
