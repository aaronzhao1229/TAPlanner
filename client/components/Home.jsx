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
      <div className="flex flex-wrap justify-center">
        <div className="card card-compact w-96 bg-base-100 shadow-xl m-6">
          <div className="flex flex-wrap justify-center">
            <figure className="w-20 h-20">
              <img src="./images/planning.png" alt="planning" />
            </figure>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title py-4 px-8 content-center">
              <Link to="/planner">Planner</Link>
            </h2>
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
          <div className="card card-compact w-96 bg-base-100 shadow-xl m-6">
            <div className="flex flex-wrap justify-center">
              <figure className="w-20 h-20">
                <img
                  src="./images/gears.png"
                  alt="gears"
                  className="rounded-xl"
                />
              </figure>
            </div>
            <div className="card-body items-center text-center">
              <h2 className="card-title py-4 px-8 content-center">
                <Link to="/gears">Gears</Link>
              </h2>
              <div>
                <div>
                  A hiker using good, lightweight equipment has a better chance
                  of finishing a hike than one overloaded with poor gear. This
                  gear organising tool helps track the weight (as well as price)
                  of your gears. To be developed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div>
          <a href={'https://www.flaticon.com'} title={'plan icons'}>
            Icons created by Freepik - Flaticon
          </a>
        </div>
      </footer>
    </>
  )
}
