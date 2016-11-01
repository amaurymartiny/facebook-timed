// reducers/index.js

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'
import track from './track'

const rootReducer = combineReducers({
  routing,
  auth,
  track
})

export default rootReducer