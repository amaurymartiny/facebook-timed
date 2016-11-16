/* eslint-disable import/no-extraneous-dependencies */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import { apiMiddleware } from '../middleware/api'
// import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, routerMiddleware(browserHistory), apiMiddleware, createLogger())
    )
  )

  return store
}
