import React from 'react'
import { Route, IndexRoute } from 'react-router'
// import AuthService from './utils/AuthService'
import { App, HomePage, DashboardPage, CallbackPage } from './containers'


// function requireAuth(nextState, replace) {
//   if (!AuthService.isAuthenticated()) {
//     replace('/')
//   }
// }

export default function createRoutes() {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={HomePage} />
      <Route path='/dashboard' component={DashboardPage} />
      <Route path='/callback' component={CallbackPage} />
      <Route path='*' component={HomePage} />
    </Route>
  )
}
