import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import entities from './entities'
import auth from './auth'
import errorMessage from './errorMessage'

const rootReducer = combineReducers({
  routing,
  auth,
  entities,
  errorMessage
})

export default rootReducer
