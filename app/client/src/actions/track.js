import { CALL_API } from 'redux-api-middleware'
import { Schema, arrayOf, normalize } from 'normalizr'
import AuthService from '../utils/AuthService'

const API_ROOT = 'http://localhost:8080/api'

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST'
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS'
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE'

export const RECEIVE_TRACK_MESSAGE = 'RECEIVE_TRACK_MESSAGE'

export function fetchTracks() {
  return {
    [CALL_API]: {
      endpoint: API_ROOT + '/tracks',
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AuthService.getToken() },
      types: [
        FETCH_TRACKS_REQUEST,
        {
          // normalize data for simpler updating
          // https://github.com/paularmstrong/normalizr
          type: FETCH_TRACKS_SUCCESS,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type')
            // Just making sure res.json() does not raise an error
            if (contentType && ~contentType.indexOf('json')) {
              // define schema for tracks
              const trackSchema = new Schema('tracks')
              // trackSchema.define({

              // })
              return res.json().then((json) => normalize(json, { tracks: arrayOf(trackSchema) }))
            }
          }
        },
        FETCH_TRACKS_FAILURE
      ]
    }
  }
}

function receiveTrackMessage(timeTrackedObject) {
  return {
    type: RECEIVE_TRACK_MESSAGE,
    payload: timeTrackedObject
  }
}

// Listen to new messages coming from the content script
export function checkTrackMessage() {
  return (dispatch) => {
    window.addEventListener('message', (event) => {
      console.log('message received', event) // eslint-disable-line
      // We only accept messages from ourselves
      if (event.source != window)
        return

      if (event.data.type && (event.data.type === 'TRACK_MESSAGE')) {
        dispatch(receiveTrackMessage(event.data.timeTrackedObject))
      }
    }, false)
  }

}