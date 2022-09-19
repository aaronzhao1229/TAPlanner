import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apis/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'
import Header from './Header'
import Nav from './Nav'

export default function Home() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  // const userInData = useSelector((state) => state.loggedInUser)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          console.log(userInDb[0])
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
    <>
      <Header />
      <Nav />
      <div className="columns">
        <div className="column">
          <div className="card m-5">
            <div className="card-image has-text-centered">
              <figure className="image is-96x96 is-inline-block mt-4">
                <img src="./images/planning.png" alt="planning" />
              </figure>
            </div>
            <header className="card-header">
              <p className="card-header-title is-centered">
                <Link to="/planner" style={{ color: 'black' }}>
                  Planner
                </Link>
              </p>
            </header>
            <div className="card-content ">
              <div className="content ml-6 mr-6 mt-5">
                This planning tool provides dropdown lists which makes planning
                easier. Most information is based on official Te Araroa notes,
                which however may be not accurate. Please refer to the official
                TA notes.
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card m-5">
            <div className="card-image has-text-centered">
              <figure className="image is-96x96 is-inline-block mt-4">
                <img src="./images/gears.png" alt="gears" />
              </figure>
            </div>
            <header className="card-header">
              <p className="card-header-title is-centered">
                <Link to="/gears" style={{ color: 'black' }}>
                  Gears
                </Link>
              </p>
            </header>
            <div className="card-content ">
              <div className="content ml-6 mr-6 mt-5">
                A hiker using good, lightweight equipment has a better chance of
                finishing a hike than one overloaded with poor gear. This gear
                organising tool helps track the weight (as well as price) of
                your gears. To be developed.
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <a
            href={'https://www.flaticon.com'}
            title={'plan icons'}
            style={{ color: '#394851' }}
          >
            Icons created by Freepik - Flaticon
          </a>
        </div>
      </footer>
    </>
  )
}
