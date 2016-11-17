import { CALL_API } from '../middleware/api'

// ======================================================
// Actions
// ======================================================
export const FIND_WEBSITES_REQUEST = 'FIND_WEBSITES_REQUEST'
export const FIND_WEBSITES_SUCCESS = 'FIND_WEBSITES_SUCCESS'
export const FIND_WEBSITES_FAILURE = 'FIND_WEBSITES_FAILURE'

// ======================================================
// Action creators
// ======================================================
/**
 * Find a website via its URL
 * @param {string} url
 * @return {[type]} [description]
 */
export function findWebsite(url) {
  return {
    [CALL_API]: {
      endpoint: `/websites/find?query=${url}`,
      method: 'GET',
      types: [FIND_WEBSITES_REQUEST, FIND_WEBSITES_SUCCESS, FIND_WEBSITES_FAILURE]
    }
  }
}
