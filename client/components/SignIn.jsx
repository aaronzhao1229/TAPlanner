import React, { useEffect } from 'react'
import Home from './Home'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'
// import { getUser } from '../apiClient/singleUser.api'
// import { useNavigate } from 'react-router-dom'
// import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'

import LandingPage from './LandingPage'
import CreateProfile from './CreatProfile'

function SignIn() {
  useCacheUser()
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  // const userInData = useSelector((state) => state.loggedInUser)

  useEffect(() => {
    // if (!isAuthenticated) {
    //   dispatch(clearLoggedInUser())
    // } else {
    getAccessTokenSilently()
      .then((token) => console.log(token))
      // .then((token) => getUser(token))
      // .then((userInDb) => {
      //   if (userInDb) {
      //     dispatch(updateLoggedInUser(userInDb))
      //   }

      // })
      .catch((err) => console.error(err))
    // }
  }, [isAuthenticated])

  return (
    <>
      <IfAuthenticated>
        {/* {userInData[0]?.username ? (
          <Home />
        ) : (
          <>
            <CreateProfile />
          </>
        )} */}
        <Home />
      </IfAuthenticated>

      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>
    </>
  )
}

export default SignIn
