// ======================================================
// Tracks
// ======================================================
import { trackableWebsites } from '../config';

// Object storing all the tracked times on all websites
const tracks = {};

const isTrackableWebsite = (name) => {
  if (Object.keys(trackableWebsites).includes(name)) {
    return true;
  }
  console.error(`Website ${name} is not trackable.`);
  return false;
};

/**
 * Add a Track in our tracks object
 * @param {String} name
 */
const addTrack = (name) => {
  if (tracks[name] || !isTrackableWebsite(name)) {
    return;
  }
  tracks[name] = {
    today: 0,
    total: 0,
    startDate: new Date(),
    lastUsedDate: new Date()
  };
};

/**
 * Update the time on Track <name>
 * @param {String} name
 */
export const updateTime = (name) => {
  if (!tracks[name]) {
    addTrack(name);
  }
  if (!isTrackableWebsite(name)) {
    return;
  }

  // Increment the time spent on website
  tracks[name].today = tracks[name].today + 1;
  tracks[name].total = tracks[name].total + 1;
};

/**
 * Get the Track object of <name>
 * @param {String} name
 */
export const get = (name) => {
  if (!isTrackableWebsite(name)) {
    return;
  }
  return tracks[name];
};
