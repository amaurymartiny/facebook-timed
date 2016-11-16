import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, HomePage, DashboardPage, CallbackPage } from './containers'

/**
 * Guard some routes with authentication
 * @param  {Object} store Redux store
 */
const requireAuth = store => (nextState, replace) => {
  if (!store.getState().auth.isAuthenticated) {
    replace('/')
  }
}

export default function createRoutes(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/dashboard" component={DashboardPage} onEnter={requireAuth(store)} />
      <Route path="/callback" component={CallbackPage} />
      <Route path="*" component={HomePage} />
    </Route>
  )
}
