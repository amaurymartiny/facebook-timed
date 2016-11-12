import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App } from './containers'
import { HomePage, AboutPage, NotFoundPage } from './components'

export default function createRoutes() {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={HomePage} />
      <Route path='/about' component={AboutPage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  )
}
