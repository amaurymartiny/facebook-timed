// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

import * as timer from './background/timer';
import * as tracks from './background/tracks';

// ======================================================
// Communication via long-lived connection
// From tracked website and/or popup
// ======================================================
// Ports can either be from:
// - content script (name='facebook', 'twitter' or 'reddit'...)
// - popup (name='popup')
let ports = []; // List of open ports

/**
 * Keep track of all our open ports
 */
chrome.runtime.onConnect.addListener((port) => {
  ports.push(port);
  // Add an additional field to know if the current port is active or not
  port.isActive = null;

  // Show page action on tab
  chrome.pageAction.show(port.sender.tab.id);

  // Everytime we receive a message from the content script of this port, we
  // update the port to set if it's active or not
  port.onMessage.addListener((message) => {
    if (message.action === 'SET_ACTIVE') {
      port.isActive = message.payload;

      // If there are active ports, then we enable the timer, or else disable it
      if (ports.filter(p => p.isActive).length) {
        timer.start(updateTime);
      } else {
        timer.stop();
      }
    }
  });

  // Delete the port from the ports object on disconnect
  port.onDisconnect.addListener((port) => {
    ports = ports.filter(p => p.sender.id !== port.sender.id);
  });
});

// ======================================================
// Update time on opened ports
// ======================================================
/**
 * Update time on content scripts label to be shown on the website DOM
 */
const updateTime = () => {
  console.log(`${ports.length} ports currently open`);

  // Get all active ports without duplicates
  // https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
  const portsWithoutDups = [...new Set(ports.filter(p => p.isActive).map(p => p.name))];

  portsWithoutDups.forEach(tracks.updateTime);

  // Send on all active ports their newly updated time
  ports.filter(p => p.isActive).map((port) => {
    port.postMessage({
      action: 'UPDATE_TIME',
      payload: tracks.get(port.name)
    });
  });

  // Get all ports that correspond to popups
  const popupPorts = ports.filter(p => p.name === 'popup');
  popupPorts.forEach((port) => {
    port.postMessage({
      action: 'UPDATE_TIME',
      payload: tracks.get(ports.find(p => p.isActive).name)
    });
  });
};
