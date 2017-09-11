export default {
  name: 'Twitter',
  regex: /(?:www.)?twitter.com/,
  addElement: () => {
    const el = document.querySelector('.global-nav .nav-extras');
    // Add the label containing the tracked time
    const label = document.createElement('span');
    label.className = 'timed-label-twitter';
    label.innerHTML = '00:00:00';
    el.insertBefore(label, el.firstChild);
    // Important! Return the label element
    return label;
  }
};
