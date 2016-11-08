// Content script to be inject on timed.com

console.log('content script loaded');

const port = chrome.runtime.connect({name: 'Timed'}); // start a long-lived connection with background for time tracking

/**
 * Send trackObject to Timed webapp when receiving it from background script
 */
port.onMessage.addListener(msg => {
  switch (msg.action) {
    case 'UPDATE_TRACKED_TIME':
      // checks also that the trackObject has a track id
      if (msg.trackObject._id)
        window.postMessage(msg, 'http://localhost:3000');
  }    
});

/**
 * Ask for tracked time if Timed webapp is requesting it 
 */
window.addEventListener('message', (event) => {
  if (event.data.action === 'GET_TRACKED_TIME')
    // get trackedTime from background
    port.postMessage({action: event.data.action});
});