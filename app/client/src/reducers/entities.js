import { combineReducers } from 'redux'
import tracks from './track'
import websites from './website'

export default function entities(state = {
  tracks: {},
  websites: {}
}, action) {
  // if there are entities in the action, then we process them into the state
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      ...action.payload.entities
    }
  }

  // else we treat them separately
  return combineReducers({ tracks, websites })(state, action)
}
