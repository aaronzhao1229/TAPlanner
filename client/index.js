import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import App from './components/App'
import reducers from './reducers'
import { BrowserRouter } from 'react-router-dom'

import './styles/index.css'

// local storage to persist state

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    // Ignore write errors;
  }
}
const peristedState = loadState()
// local storage to persist state

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  // local storage to persist state
  peristedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

// local storage to persist state
store.subscribe(() => {
  saveState(store.getState())
})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain="pikopiko-2022-aaron.au.auth0.com"
      clientId="kXJmiXpbBYvQoCzvg6iI8aJ5qkSKN1Xh"
      redirectUri={window.location.origin}
      audience="https://taplanner/api"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
