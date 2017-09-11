export default {
  name: 'Amazon',
  regex: /(?:www.)?amazon.(com|de|fr|co.uk)/,
  addElement: () => {
    const el = document.querySelector('#nav-xshop');
    const label = document.createElement('a');
    label.className = 'timed-label-amazon';
    label.innerHTML = '00:00:00';
    el.appendChild(label);
    // Important! Return the label element
    return label;
  }
};
