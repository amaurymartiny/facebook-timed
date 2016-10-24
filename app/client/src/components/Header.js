import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props
    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        { !isAuthenticated ? (
          <ul>
            <li><button onClick={onLoginClick}>Login</button></li>
          </ul>
        ) : (
          <ul>
            <li><img src={profile.picture} height="40px" /></li>
            <li><span>Welcome, {profile.nickname}</span></li>
            <li><button onClick={onLogoutClick}>Logout</button></li>
          </ul>
        )}
        <input type="text" />
      </div>
    )
  }
}
