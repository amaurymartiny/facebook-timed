import React from 'react';

import Header from './Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div>
        <Header />
        bar
        <input type="text" />
      </div>
    );
  }
}
