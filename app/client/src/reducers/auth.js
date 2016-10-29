import * as ActionTypes from '../actions'
import { AuthService } from '../utils/AuthService'

export default function auth(state = {
  isAuthenticated: AuthService.checkTokenExpiry(),
  isFetching: false,
  profile: AuthService.getProfile(),
  error: null
}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {...state, isFetching: true}
    case ActionTypes.LOGIN_SUCCESS:
      return {...state, isFetching: false, isAuthenticated: true, profile: action.profile}
      break;
    case ActionTypes.LOGIN_ERROR:
      return {...state, isFetching: false, isAuthenticated: false, profile: null, error: action.error}
      break;
    case ActionTypes.LOGOUT_SUCCESS:
      return {...state, isFetching: false, isAuthenticated: false, profile: null}
      break
    default:
      return state
    }
}