import * as ActionTypes from '../actions'

// Updates error message to notify about the failed fetches.
export default function errorMessage(state = null, action) {
  const { type, error, payload } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error && payload.name && payload.message) {
    return payload.name + ': ' + payload.message
  } else if (error) {
    return 'Error: ' + error.toString()
  }

  return state
}
