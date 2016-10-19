import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService';

export class LoginPage extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <h2>Login</h2>
        <button onClick={auth.login.bind(this)}>Login</button>
      </div>
    )
  }
}

export default LoginPage;