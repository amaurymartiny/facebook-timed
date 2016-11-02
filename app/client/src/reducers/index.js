// reducers/index.js

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'
import errorMessage from './errorMessage'
import tracks from './track'

const entities = combineReducers({
  tracks
})

const rootReducer = combineReducers({
  routing,
  auth,
  entities,
  errorMessage
})

export default rootReducer