import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import NotFoundPage from './components/NotFoundPage'

// onEnter callback to validate authentication in private routes
function requireAuth(store) {
  let {auth} = store.getState()
  return (nextState, replace) => {
    if (!auth.isAuthenticated) {
      replace({ pathname: '/login' })
    }
  }
}

export default function createRoutes(store) {
  return(
    <Route path='/' component={App}>
      <IndexRoute component={HomePage} onEnter={requireAuth(store)} />
      <Route path='/login' component={LoginPage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  )
}
