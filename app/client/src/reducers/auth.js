import * as AuthActions from '../actions/auth'
import AuthService from '../utils/AuthService'

export default function authReducer(state = {
  isAuthenticated: !AuthService.isTokenExpired(),
  isFetching: false,
  profile: AuthService.getProfile(),
  error: null
}, action) {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
      return {...state, isFetching: true, error: null}
    case AuthActions.LOGIN_SUCCESS:
      return {...state, isFetching: false, isAuthenticated: true, profile: action.profile}
    case AuthActions.LOGIN_ERROR:
      return {...state, isFetching: false, isAuthenticated: false, profile: {}, error: action.error}
    case AuthActions.LOGOUT_SUCCESS:
      return {...state, isAuthenticated: false, profile: {}}
    default:
      return state
  }
}