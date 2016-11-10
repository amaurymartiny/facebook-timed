// reducers/index.js

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'
import errorMessage from './errorMessage'
import tracks from './track'
import websites from './website'

const entities = combineReducers({
  tracks,
  websites
})

const rootReducer = combineReducers({
  routing,
  auth,
  entities,
  errorMessage
})

export default rootReducer
