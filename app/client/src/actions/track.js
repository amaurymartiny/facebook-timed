import { CALL_API } from 'redux-api-middleware'
import AuthService from '../utils/AuthService'

const API_ROOT = 'http://localhost:8080/api'

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST'
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS'
export const FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR'

export function fetchTracks() {
  return {
    [CALL_API]: {
      endpoint: API_ROOT + '/tracks',
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AuthService.getToken() },
      types: [FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS, FETCH_TRACKS_ERROR]
    }
  }
}
