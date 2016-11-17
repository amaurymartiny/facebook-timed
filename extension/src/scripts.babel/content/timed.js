// Content script to be inject on timed.com

console.log('content script loaded');

const port = chrome.runtime.connect({name: 'Timed'}); // start a long-lived connection with background

/**
 * Send trackObject to Timed webapp when receiving it from background script
 */
port.onMessage.addListener(msg => {
  switch (msg.action) {
    case 'UPDATE_TRACKED_TIME':
      // checks also that the trackObject has a track id
      if (msg.trackObject._id)
        window.postMessage(msg, '/* @echo WEBAPP */');
      break;
  }    
});

/**
 * Ask for tracked time if Timed webapp is requesting it 
 */
window.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'CONNECTION_REQUEST':
      window.postMessage({action: 'CONNECTION_SUCCESS', ok: true}, '/* @echo WEBAPP */');
      break;
    case 'GET_TRACKED_TIME':
      // get trackObject from background.js
      port.postMessage({action: event.data.action});
      break;
    case 'SET_NEW_TOKEN':
      port.postMessage({action: event.data.action, id_token: event.data.id_token});

      break;
    case 'SET_NEW_PROFILE':
      port.postMessage({action: event.data.action, profile: event.data.profile})
      break;
  } 
});