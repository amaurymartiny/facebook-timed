// Content script to be inject on timed.com

console.log('content script loaded');

const port = chrome.runtime.connect({name: 'Timed'}); // start a long-lived connection with background

/**
 * Send trackObject to Timed webapp when receiving it from background script
 */
port.onMessage.addListener(msg => {
  switch (msg.action) {
    case 'UPDATE_TRACKED_TIME':
      window.postMessage({action: msg.action, trackObject: msg.trackObject, source: 'extension'}, '/* @echo WEBAPP */');
      break;
  }    
});

/**
 * Ask for tracked time if Timed webapp is requesting it 
 */
window.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'CONNECTION_REQUEST':
      window.postMessage({action: 'CONNECTION_SUCCESS', ok: true, source: 'extension'}, '/* @echo WEBAPP */');
      break;
    case 'SET_TRACK_OBJECT':
    case 'GET_TRACK_OBJECT':
    case 'SET_NEW_TOKEN':
    case 'SET_NEW_PROFILE':
      // transfer the action to the background script
      port.postMessage(event.data)
      break;
  } 
});