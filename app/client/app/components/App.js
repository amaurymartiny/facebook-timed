import React from 'react';

import Header from './Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <div>
        <Header auth={this.props.route.auth} />
        {children}
        <input type="text" />
      </div>
    );
  }
}
