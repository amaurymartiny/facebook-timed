import React from 'react';

import Header from './Header';
import LoginPage from './LoginPage';
import AuthService from '../utils/AuthService';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    const auth = new AuthService('SyZVm6XmXC4JgIBfw1sj3iHTEdmJ59UC', 'timed.auth0.com');
    return (
      <div>
        <Header />
        bar
        <input type="text" />
        <LoginPage auth={auth} />
      </div>
    );
  }
}
