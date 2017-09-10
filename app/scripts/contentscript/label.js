// ======================================================
// Showing time on label
// ======================================================
import { trackableWebsites } from '../config';

let timeLabel; // DOM element on which we'll show the time

/**
 * Modify Facebook DOM to add label with time tracked
 */
export const init = (name) => {
  const el = document.querySelector(trackableWebsites[name].querySelector);
  timeLabel = document.createElement('div');
  timeLabel.className = `timed-label-${name}`;
  timeLabel.innerHTML = '00:00:00';
  el.insertBefore(timeLabel, el.firstChild);
};

/**
 * Update time shown on label with updated value
 */
export const updateLabel = (time) => {
  // Update time label with hh:mm:ss format
  var hours = parseInt(time / 3600) % 24;
  var minutes = parseInt(time / 60) % 60;
  var seconds = time % 60;
  var hhmmss = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  timeLabel.innerHTML = hhmmss;
};
