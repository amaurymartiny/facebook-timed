import { push } from 'react-router-redux'
import AuthService from '../utils/AuthService'

// ======================================================
// Actions
// ======================================================
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

// ======================================================
// Action creators
// ======================================================
const authService = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN)

export function loginRequest() {
  authService.login()
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(profile) {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS, profile: profile })
    dispatch(push('/dashboard'))
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  }
}

// Listen to authenticated event from AuthService and get the profile of the user
// Done on every page startup
export function checkLogin() {
  return (dispatch) => {
    // Add callback for lock's `authenticated` event
    authService.lock.on('authenticated', (authResult) => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          return dispatch(loginFailure(error))
        }
        AuthService.setToken(authResult.idToken) // static method
        AuthService.setProfile(profile) // static method
        dispatch(loginSuccess(profile))
      })
    })
    // Add callback for lock's `authorization_error` event
    authService.lock.on('authorization_error', error => dispatch(loginFailure(error)))
  }
}

export function logoutSuccess() {
  authService.logout()
  return (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS })
    dispatch(push('/'))
  }
}
