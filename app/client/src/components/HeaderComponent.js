import React from 'react'
import { Link } from 'react-router'

const HeaderComponent = ({ isAuthenticated, profile, authService, onLoginClick, onLogoutClick }) =>
  <div>
    <h1>Timed</h1>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>
    </ul>
    { !isAuthenticated ? (
      <button onClick={() => onLoginClick(authService)}>Login</button>
    ) : (
      <div>
        <img src={profile.picture} height="40px" />
        <span>Welcome, {profile.nickname}</span>
        <button onClick={() => onLogoutClick(authService)}>Logout</button>
      </div>
    )}
  </div>

HeaderComponent.propTypes = {
  isAuthenticated: React.PropTypes.boolean.isRequired,
  profile: React.PropTypes.object.isRequired,
  authService: React.PropTypes.object.isRequired,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default HeaderComponent
