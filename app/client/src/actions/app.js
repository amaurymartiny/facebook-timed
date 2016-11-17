import { createTrack, updateTrack } from './track'
import * as MessageService from '../utils/MessageService'

// ======================================================
// Actions
// ======================================================
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const RECEIVE_EXTENSION_MESSAGE = 'RECEIVE_EXTENSION_MESSAGE'
export const RECEIVE_EXTENSION_TRACK_MESSAGE = 'RECEIVE_EXTENSION_TRACK_MESSAGE'

// ======================================================
// Action creators
// ======================================================
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

function receiveExtensionMessage(payload) {
  return {
    type: RECEIVE_EXTENSION_MESSAGE,
    payload
  }
}

function receiveExtensionTrackMessage(trackObject) {
  return {
    type: RECEIVE_EXTENSION_TRACK_MESSAGE,
    payload: trackObject
  }
}

// Listen to new messages coming from the content script
export function checkExtensionMessages() {
  return (dispatch) => {
    // initialize the communication to make sure everything is ok (optional)
    MessageService.init()

    // listen to incoming messages
    MessageService.listen({
      CONNECTION_RESPONSE: () => {
        dispatch(receiveExtensionMessage(event.data))
      },
      UPDATE_TRACKED_TIME: (data) => {
        if (!data.trackObject._id) {
          // create a new track object on the server is if the first time
          dispatch(createTrack(data.trackObject))
          // we'll also need to get the
        } else {
          // update the track object
          dispatch(receiveExtensionTrackMessage(data.trackObject))
          dispatch(updateTrack(data.trackObject))
        }
      }
    })
  }
}
