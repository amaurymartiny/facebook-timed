// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'

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
  timer.start(updateTime);

  // Delete the port from the ports object on disconnect
  port.onDisconnect.addListener((port) => {
    ports = ports.filter(p => p.sender.id !== port.sender.id);

    // If there's no more open ports for tracking website, then we stop the timer
    if (!Object.keys(ports).filter(p => p !== 'popup').length) {
      timer.stop();
    }
  });
});

// ======================================================
// Update time on opened ports
// ======================================================
/**
 * Update time on content scripts label to be shown on Facebook DOM
 */
const updateTime = () => {
  // Get all ports without duplicates
  // https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
  const portsWithoutDups = [...new Set(ports.map(p => p.name))];

  portsWithoutDups.forEach(tracks.updateTimeOnTrack);
  console.log(tracks.getTracks());
};
