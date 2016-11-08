'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Deal with API calls from the background script to the server

/**
 * General helper function to create a XHR object
 */
function createXHR(method, endpoint, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, 'http://localhost:8080/api' + endpoint, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (localStorage.getItem('id_token')) xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // JSON.parse does not evaluate the attacker's scripts.
      return callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(JSON.stringify(data));
}

/**
 * Helper object to do the API requests
 */
var callAPI = exports.callAPI = {
  get: function get(endpoint, callback) {
    return createXHR('GET', endpoint, null, callback);
  },
  put: function put(endpoint, data, callback) {
    return createXHR('PUT', endpoint, data, callback);
  }
};