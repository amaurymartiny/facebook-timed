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
