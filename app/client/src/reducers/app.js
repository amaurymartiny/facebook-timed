import * as AppActions from '../actions/app'

/**
 * Reducer about the state of the app (isLoading, errors, extension connected)
 * @param  {Object} state  Previous state
 * @param  {Object} action Action
 * @return {Object}        Next state
 */
export default function app(state = {
  isLoading: false, //TODO not implemented yet
  isExtensionConnected: false,
  errorMessage: null
}, action) {
  const { type, error, payload } = action

  // see if extension if connected to app
  if (type === AppActions.RECEIVE_EXTENSION_MESSAGE) {
    return {
      ...state,
      isExtensionConnected: true
    }
  }

  // handle errors to show in a notification
  if (type === AppActions.RESET_ERROR_MESSAGE) {
    return {
      ...state,
      errorMessage: null
    }
  } else if (error && payload.name && payload.message) {
    return {
      ...state,
      errorMessage: `${payload.name}: ${payload.message}`
    }
  } else if (error) {
    return {
      ...state,
      errorMessage: `Error: ${error.toString()}`
    }
  }

  return state
}
