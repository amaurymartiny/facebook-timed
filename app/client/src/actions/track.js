import { CALL_API } from '../middleware/api'
import { findWebsite } from './website'
import * as MessageService from '../utils/MessageService'
import AuthService from '../utils/AuthService'

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
export function fetchTracksAndGetExtensionTrackObject() {
  return async (dispatch) => {
    const actionResponse = await dispatch(fetchTracks())

    if (actionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      // throw new Error("Promise flow received action error", actionResponse);
      return
    }

    // send message to extension to get the track object when the tracks are fetched
    MessageService.postMessage(MessageService.GET_TRACK_OBJECT)
  }
}

/**
 * Create track and send message to extension
 * @param {object} trackObject The track object to be put in the server
 * This track object only has today, total and startDate properties
 * We need to add auth0Id and website properties
 * Here's the flow:
 * - Get the website id (knowing the url), async
 * - Get the auth0Id from AuthService, sync
 * - Then create a track on the server, aysnc
 * - Then send the newly created track object to the extension
 */
export function createTrackAndSetExtensionTrackObject(trackObject) {
  return async (dispatch) => {
    const findWebsiteActionResponse = await dispatch(findWebsite('https://facebook.com')) // TODO replace fb

    if (findWebsiteActionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      return
    }

    // we take the id of the first website found, and put it inside trackObject.website
    trackObject.website = Object.keys(findWebsiteActionResponse.payload.entities.websites)[0] // eslint-disable-line
    // we also put the auth0Id from AuthService
    trackObject.auth0Id = AuthService.getProfile().user_id // eslint-disable-line no-param-reassign

    // now we're ready to create the object
    const createTrackActionResponse = await dispatch(createTrack(trackObject))

    if (createTrackActionResponse.error) {
      // the last dispatched action has errored, break out of the promise chain.
      return
    }

    // retrieve the newly created track object
    const t = createTrackActionResponse.payload.entities.tracks // shorthand for next line
    const newTrackObject = t[Object.keys(t)[0]]

    // send message to extension to get the track object when the tracks are fetched
    MessageService.postMessage(MessageService.SET_TRACK_OBJECT, {
      trackObject: newTrackObject
    })
  }
}
