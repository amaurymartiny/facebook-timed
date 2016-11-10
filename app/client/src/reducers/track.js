import * as TrackActions from '../actions/track'
import * as AuthActions from '../actions/auth'

export default function tracksReducer(state = {}, action) {
  switch (action.type) {
    case TrackActions.RECEIVE_TRACK_MESSAGE:
      // only update time if there's already an entity
      if (!state[action.payload._id]) {
        return state
      }
      return {
        ...state,
        [action.payload._id]: action.payload
      }
    case AuthActions.LOGOUT_SUCCESS:
      return { }
    default:
      return state
  }
}
