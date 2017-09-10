// ======================================================
// Tracks
// ======================================================
import { trackableWebsites } from '../config';

// Object storing all the tracked times on all websites
const tracks = JSON.parse(window.localStorage.getItem('tracks')) || {};

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
    name,
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

  // Reset time tracked today if day changed
  if ((new Date(tracks[name].lastUsedDate)).getDate() !== (new Date()).getDate()) {
    tracks[name].today = 0;
  }
  tracks[name].lastUsedDate = new Date();

  // Save to localStorage
  saveToLocalStorage();
};

/**
 * Save the tracks object to localStorage
 */
const saveToLocalStorage = () => {
  window.localStorage.setItem('tracks', JSON.stringify(tracks));
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

export const getAll = () => {
  return tracks;
};
