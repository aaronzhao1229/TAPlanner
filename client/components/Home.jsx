import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apis/user.api'
import { useDispatch } from 'react-redux'
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
      <div>
        <div>
          <div>
            <div>
              <figure>
                <img src="./images/planning.png" alt="planning" />
              </figure>
            </div>
            <header>
              <p>
                <Link to="/planner">Planner</Link>
              </p>
            </header>
            <div>
              <div>
                This planning tool provides dropdown lists which makes planning
                easier. Most information is based on official Te Araroa notes,
                which however may be not accurate. Please refer to the official
                TA notes.
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <figure>
                <img src="./images/gears.png" alt="gears" />
              </figure>
            </div>
            <header>
              <p>
                <Link to="/gears">Gears</Link>
              </p>
            </header>
            <div>
              <div>
                A hiker using good, lightweight equipment has a better chance of
                finishing a hike than one overloaded with poor gear. This gear
                organising tool helps track the weight (as well as price) of
                your gears. To be developed.
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div>
          <a href={'https://www.flaticon.com'} title={'plan icons'}>
            Icons created by Freepik - Flaticon
          </a>
        </div>
      </footer>
    </>
  )
}
