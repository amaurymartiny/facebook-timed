// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'

import * as timer from './background/timer';
import * as tracks from './background/tracks';

// let ports = []; // when multiple facebook tabs, save all the long-lived connection port inside this array

// let lastUsedDay = window.localStorage.getItem('lastUsedDay'); // date of last usage

// // The track object that will be updated to the server
// let trackObject = JSON.parse(window.localStorage.getItem('trackObject')) || {
//   // there are other properties when the extension is connected to the web app (_id, auth0Id, website)
//   today: 0, // time spent on facebook today
//   total: 0, // time spent on facebook all time
//   startDate: (new Date()).toString() // date of beginning of usage
// };

// ======================================================
// Do on install
// ======================================================
/**
 * Check whether new version is installed
 */
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'update') { // can be 'install' too
    console.log('Timed Extension updated from ' + details.previousVersion + ' to ' + chrome.runtime.getManifest().version + '.');
  }
});

// ======================================================
// Communication via long-lived connection
// From tracked website and/or popup
// ======================================================
// List of open ports
// Ports can either be from:
// - content script (name='facebook', 'twitter' or 'reddit'...)
// - popup (name='popup')
let ports = [];

/**
 * Keep track of all our open ports
 */
chrome.runtime.onConnect.addListener((port) => {
  ports.push(port);
  console.log(`New "${port.name}" port opened.`);

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
  console.log('HELLO');

  // Get all ports without duplicates (https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array)
  const portsWithoutDups = [...new Set(ports.map(p => p.name))];

  portsWithoutDups.forEach(tracks.updateTimeOnTrack);
  console.log(tracks.getTracks())
};
