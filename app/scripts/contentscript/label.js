// ======================================================
// Showing time on label
// ======================================================
import { trackableWebsites } from '../config';

let labelElement; // DOM element on which we'll show the time

/**
 * Modify Facebook DOM to add label with time tracked
 */
export const init = (name) => {
  try {
    labelElement = trackableWebsites[name].addElement();
  } catch (e) {
    console.warn('[TIMED] Timed extension cannot place label on this page.');
  }
};

/**
 * Update time shown on label with updated value
 */
export const update = (time) => {
  if (!labelElement) {
    return;
  }
  // Update time label with hh:mm:ss format
  var hours = parseInt(time / 3600) % 24;
  var minutes = parseInt(time / 60) % 60;
  var seconds = time % 60;
  var hhmmss = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  labelElement.innerHTML = hhmmss;
};
