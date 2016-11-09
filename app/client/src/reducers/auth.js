import * as AuthActions from '../actions'
import AuthService from '../utils/AuthService'

export default function authReducer(state = {
  isAuthenticated: AuthService.isAuthenticated(),
  profile: AuthService.getProfile(),
}, action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state, 
        isAuthenticated: true,
        profile: action.profile
      }
    case AuthActions.LOGIN_FAILURE:
    case AuthActions.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: {}
      }
    default:
      return state
  }
}