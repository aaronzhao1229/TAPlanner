import React, { useEffect } from 'react'
import Home from './Home'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'
import { getUser } from '../apis/user.api'
import { useNavigate } from 'react-router-dom'
import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'

import LandingPage from './LandingPage'
import CreateProfile from './CreatProfile'

function SignIn() {
  return (
    <>
      <IfAuthenticated>
        {/* {userInData?.firstName ? ( */}
        <Home />
        {/* ) : (
          <>
            <CreateProfile />
          </>
        )} */}
      </IfAuthenticated>

      <IfNotAuthenticated>
        <LandingPage />
      </IfNotAuthenticated>
    </>
  )
}

export default SignIn
