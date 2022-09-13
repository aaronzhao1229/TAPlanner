import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './components/App'

import { BrowserRouter } from 'react-router-dom'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain="pikopiko-2022-aaron.au.auth0.com"
      clientId="kXJmiXpbBYvQoCzvg6iI8aJ5qkSKN1Xh"
      redirectUri={window.location.origin}
      audience="https://taplanner/api"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
