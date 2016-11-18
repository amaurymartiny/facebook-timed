import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { apiMiddleware } from '../middleware/api'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, routerMiddleware(browserHistory), apiMiddleware)
  )
}
