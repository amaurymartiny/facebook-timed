import { CALL_API, apiMiddleware, isRSAA, getJSON } from 'redux-api-middleware'
import { Schema, arrayOf, normalize } from 'normalizr'
import AuthService from '../utils/AuthService'

const API_ROOT = process.env.API_ROOT

// ======================================================
// Define schemas for normalizr
// ======================================================
const trackSchema = new Schema('tracks', {
  idAttribute: track => track._id
})

const websiteSchema = new Schema('websites', {
  idAttribute: website => website._id
})

trackSchema.define({
  website: websiteSchema
})

// ======================================================
// Normalize on success
// ======================================================

// export const myApiMiddleware = store => next => action => {
//   // if (typeof action[CALL_API] === 'undefined') {
//   //   return apiMiddleware(store)(next)(action)
//   // }
//   // action[CALL_API].endpoint = API_ROOT + action[CALL_API].endpoint
//   // console.log(action[CALL_API]) // eslint-disable-line

//   return apiMiddleware(store)(next)(action)
// }
function myApiMiddleware(store) {
  return next => action => {
    if (!isRSAA(action)) {
      return next(action)
    }
    // prepend API_ROOT to all endpoints
    action[CALL_API].endpoint = API_ROOT + action[CALL_API].endpoint
    // add Authorization header with token
    action[CALL_API].headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AuthService.getToken() }
    // normalize data on SUCCESS
    const type = typeof action[CALL_API].types[1] === 'string' ? action[CALL_API].types[1] : action[CALL_API].types[1].type // 0 is REQUEST, 1 is SUCCESS and 2 is FAILURE
    action[CALL_API].types[1] = {
      type: type,
      payload: (action, state, res) => {
        const entity = type.substring(type.indexOf('_') + 1, type.lastIndexOf('_')) // entity can be TRACK(S), WEBSITE(S)
        // the following switch can be done in one line, but for clarity I prefer this
        let schema
        switch (entity) {
          case 'TRACK':
            schema = trackSchema
            break
          case 'TRACKS':
            schema = arrayOf(trackSchema)
            break
          case 'WEBSITE':
            schema = websiteSchema
            break
          default:
            schema = null
        }
        return getJSON(res).then((json) => normalize(json, schema))
      }
    }
    return apiMiddleware(store)(next)(action)
  }
}
// 
// 
// let myApiMiddleware = apiMiddleware
export { myApiMiddleware as apiMiddleware }

export { CALL_API, getJSON } from 'redux-api-middleware'