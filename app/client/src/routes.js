import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App, HomePage, CallbackPage } from './containers'

export default function createRoutes() {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={HomePage} />
      <Route path='/callback' component={CallbackPage} />
      <Route path='*' component={HomePage} />
    </Route>
  )
}
