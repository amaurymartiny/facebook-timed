// Communication between webapp and extension via content script
import AuthService from './AuthService'

// ======================================================
// Sending Messages
// ======================================================
// All our actions
export const CONNECTION_REQUEST = 'CONNECTION_REQUEST'
export const SET_NEW_TOKEN = 'SET_NEW_TOKEN'
export const SET_NEW_PROFILE = 'SET_NEW_PROFILE'

export function postMessage(action, payload) {
  window.postMessage({ ...payload, action, source: 'webapp' }, process.env.HOST)
}

export function postAuthMessage() {
  postMessage(SET_NEW_TOKEN, { id_token: AuthService.getToken() }, process.env.HOST)
  postMessage(SET_NEW_PROFILE, { profile: AuthService.getProfile() }, process.env.HOST)
}

// ======================================================
// Initialization
// ======================================================
/**
 * Initialize the connection, to make sure everything is ok
 * This function is optional, you don't need to run to have this service work
 * @return {[type]} [description]
 */
export function init() {
  // send message to check the connection between webapp and extension (content script)
  postMessage(CONNECTION_REQUEST)

  // if we are authenticated, send also id_token and profile
  if (AuthService.isAuthenticated()) {
    postAuthMessage()
  }
}

// ======================================================
// Receiving Messages
// ======================================================
/**
 * Listen to messages from content script and do actions accordingly
 * @param  {object} actions {actionName1: func(data), actionName2: func(data), ...}
 * @return {[type]}         [description]
 */
export function listen(actions) {
  window.addEventListener('message', (event) => {
    // We only accept messages from our window
    if (event.origin !== process.env.HOST) {
      return
    }

    // we abort if not from our extension
    if (!event.data || event.data.source !== 'extension') {
      return
    }

    // we abort if there's no action
    if (!event.data.action) {
      return
    }

    // perform the action (function) if it's listed in our actions list
    if (event.data.action in actions) {
      actions[event.data.action](event.data)
    }
  }, false)
}

