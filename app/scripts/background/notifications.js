// ======================================================
// Manage notifications
// ======================================================
import { trackableWebsites } from '../config';

let notificationPeriod;

// Get notification period from local storage
chrome.storage.sync.get({ notificationPeriod: 30 }, (items) => {
  notificationPeriod = items.notificationPeriod;
});

// Update notification perdion when it gets updated from options
chrome.storage.onChanged.addListener((changes) => {
  if (!changes.notificationPeriod) {
    return;
  }
  notificationPeriod = changes.notificationPeriod.newValue;
});

const readableTime = (sec) => {
  const hours = parseInt(sec / 3600) % 24;
  const minutes = parseInt(sec / 60) % 60;
  return (hours > 0 ? hours + ' hour' + (hours > 1 ? 's' : '') + (minutes > 0 ? ' ' : '') : '') +
    (minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : '');
};

export const getNotificationPeriod = () => notificationPeriod;

export const createNotification = (name, track) => {
  chrome.notifications.create({
    type: 'basic',
    title: `${trackableWebsites[name].name}Timed`,
    message: `You've been browsing ${trackableWebsites[name].name} for ${readableTime(track.today)} today.`,
    iconUrl: 'images/watch_128_padding16.png'
  });
};
