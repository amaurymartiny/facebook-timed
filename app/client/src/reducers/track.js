import * as TrackActions from '../actions/track'
import * as AuthActions from '../actions/auth'

export default function fetchTracksReducer(state = {
  isFetching: false,
  tracks: {},
  error: null
}, action) {
  switch (action.type) {
    case TrackActions.FETCH_TRACKS_REQUEST:
      return { ...state, isFetching: true, error: action.error ? action.payload.name + ': ' + action.payload.message : null }
    case TrackActions.FETCH_TRACKS_SUCCESS:
      console.log(action) // eslint-disable-line
      return { ...state, isFetching: false, tracks: action.payload, error: null }
    case TrackActions.FETCH_TRACKS_FAILURE:
      return { ...state, isFetching: false, error: action.payload.name + ': ' + action.payload.message }
    case TrackActions.RECEIVE_TRACK_MESSAGE:
      return { ...state, tracks: action.payload }
    case AuthActions.LOGOUT_SUCCESS:
      return { ...state, isFetching: false, tracks: [] }
    default:
      return state
  }
}