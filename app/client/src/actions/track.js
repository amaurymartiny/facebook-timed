import { CALL_API } from '../middleware/api'

// ======================================================
// Actions
// ======================================================
export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST'
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS'
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE'

export const UPDATE_TRACK_REQUEST = 'UPDATE_TRACK_REQUEST'
export const UPDATE_TRACK_SUCCESS = 'UPDATE_TRACK_SUCCESS'
export const UPDATE_TRACK_FAILURE = 'UPDATE_TRACK_FAILURE'

export const RECEIVE_EXTENSION_MESSAGE = 'RECEIVE_EXTENSION_MESSAGE'
export const RECEIVE_EXTENSION_TRACK_MESSAGE = 'RECEIVE_EXTENSION_TRACK_MESSAGE'

// ======================================================
// Action creators
// ======================================================

/**
 * Get the tracked times from the server db
 * @return {[type]} [description]
 */
export function fetchTracks() {
  return {
    [CALL_API]: {
      endpoint: '/tracks',
      method: 'GET',
      types: [FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS, FETCH_TRACKS_FAILURE]
    }
  }
}

/**
 * Save the tracked times to the server
 * @return {[type]} [description]
 */
export function updateTrack(trackObject) {
  return {
    [CALL_API]: {
      endpoint: `/tracks/${trackObject._id}`,
      method: 'PUT',
      body: JSON.stringify({
        today: trackObject.today,
        total: trackObject.total,
        startDate: trackObject.startDate
      }),
      types: [UPDATE_TRACK_REQUEST, UPDATE_TRACK_SUCCESS, UPDATE_TRACK_FAILURE]
    }
  }
}

function receiveExtensionMessage() {
  return {
    type: RECEIVE_EXTENSION_MESSAGE
  }
}

function receiveTrackMessage(trackObject) {
  return {
    type: RECEIVE_EXTENSION_TRACK_MESSAGE,
    payload: trackObject
  }
}

// Listen to new messages coming from the content script
export function checkExtensionMessages() {
  return (dispatch) => {
    // send message to get lastest tracked times
    window.postMessage({ action: 'GET_TRACKED_TIME' }, '*')

    window.addEventListener('message', (event) => {
      // We only accept messages from ourselves
      if (event.source !== window) {
        return
      }

      // we abort if there's no action
      if (!event.data.action) {
        return
      }

      // dispatch the fact that we can communicat with the extension
      dispatch(receiveExtensionMessage())

      switch(event.data.action) {
        case 'UPDATE_TRACKED_TIME':
          dispatch(receiveTrackMessage(event.data.trackObject))
          dispatch(updateTrack(event.data.trackObject))
          break
        default:
      }
    }, false)
  }
}
