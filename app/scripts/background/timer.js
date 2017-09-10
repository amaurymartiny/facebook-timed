// ======================================================
// Time tracking
// ======================================================
let timer = null; // 1-second timer

/**
 * Start tracking time spent on facebook
 */
export const start = (doOnTick) => {
  if (timer) {
    return;
  }
  timer = setInterval(doOnTick, 1000);
};

/**
 * Stop tracking time spent on facebook
 */
export const stop = () => {
  clearInterval(timer);
  timer = null;
};
