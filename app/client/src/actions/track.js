import { CALL_API } from '../middleware/api'

// ======================================================
// Actions
// ======================================================
export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST'
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS'
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE'

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST'
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS'
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE'

export const UPDATE_TRACK_REQUEST = 'UPDATE_TRACK_REQUEST'
export const UPDATE_TRACK_SUCCESS = 'UPDATE_TRACK_SUCCESS'
export const UPDATE_TRACK_FAILURE = 'UPDATE_TRACK_FAILURE'

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
 * Create a new track on the server (first-time only)
 */
export function createTrack(trackObject) {
  return {
    [CALL_API]: {
      endpoint: '/tracks',
      method: 'POST',
      body: JSON.stringify({
        auth0Id: trackObject.auth0Id,
        today: trackObject.today,
        total: trackObject.total,
        startDate: trackObject.startDate,
        website: trackObject.website
      }),
      types: [CREATE_TRACK_REQUEST, CREATE_TRACK_SUCCESS, CREATE_TRACK_FAILURE]
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

/**
 * Request the track object from the extension
 * But only after we have done a fetch track
 * @return {[type]} [description]
 */
export function getExtensionTrackMessage() {
  return async (dispatch) => {
    const actionResponse = await dispatch(fetchTracks())

    if (actionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      // throw new Error("Promise flow received action error", actionResponse);
      return
    }

    // send message to extension to get the track object when the tracks are fetched
    if (!actionResponse.error) {
      window.postMessage({ action: 'GET_TRACKED_TIME', source: 'webapp' }, process.env.HOST)
    }
  }
}
