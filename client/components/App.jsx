import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Nav from './Nav'
import Header from './Header'
import Planner from './Planner'
import Gears from './Gears'
import DelayComponent from './DelayComponent'
import SingleProfile from './SingleProfile'
import LandingPage from './LandingPage'
import Home from './Home'
import CreateProfile from './CreatProfile'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apis/user.api'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'

const App = () => {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          if (userInDb[0]) {
            dispatch(updateLoggedInUser(userInDb[0]))
          } else {
            console.log('navigate')
            navigate('/createProfile')
          }
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])

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
                <DelayComponent>
                  <Header />
                  <LandingPage />
                </DelayComponent>
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
              <Planner />
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
