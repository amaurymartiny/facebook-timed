export default {
  name: 'Instagram',
  regex: /(?:www.)?instagram.com/,
  addElement: () => {
    const el = document.querySelector('[role="navigation"] div:nth-child(2) > div > div > div:nth-child(3) > div'); // Kind of hacky
    console.log(el)
    const label = document.createElement('div');
    label.className = 'timed-label-instagram';
    label.innerHTML = '00:00:00';
    el.insertBefore(label, el.firstChild);
    // Important! Return the label element
    return label;
  }
};
