import * as TrackActions from '../actions/track'
import * as AuthActions from '../actions/auth'

export default function fetchTracksReducer(state = {
  isFetching: false,
  tracks: [],
  error: null
}, action) {
  switch (action.type) {
    case TrackActions.FETCH_TRACKS_REQUEST:
      return {...state, isFetching: true, error: null}
    case TrackActions.FETCH_TRACKS_SUCCESS:
      console.log(action) // eslint-disable-line
      return {...state, isFetching: false, tracks: action.payload}
    case TrackActions.FETCH_TRACKS_ERROR:
      return {...state, isFetching: false, error: action.payload}
    case AuthActions.LOGOUT_SUCCESS:
      return {...state, isFetching: false, tracks: []}
    default:
      return state
  }
}