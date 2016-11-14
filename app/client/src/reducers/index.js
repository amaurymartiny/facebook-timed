import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import entities from './entities'
import app from './app'
import auth from './auth'

const rootReducer = combineReducers({
  routing,
  app,
  auth,
  entities
})

export default rootReducer
