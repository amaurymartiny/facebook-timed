import React from 'react'
import { connect } from 'react-redux'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import { loginRequest, logoutSuccess } from '../../actions'

const Login = ({ isAuthenticated, profile, onLoginClick, onLogoutClick }) => {
  if (isAuthenticated) {
    return (
      <NavDropdown title={profile.name} id="login-nav-dropdown">
        {/*<MenuItem disabled>Profile</MenuItem>*/}
        <MenuItem onClick={onLogoutClick}>Sign out</MenuItem>
      </NavDropdown>
    )
  }
  return <NavItem onClick={onLoginClick}>Login</NavItem>
}

Login.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  profile: React.PropTypes.object,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { isAuthenticated, profile } = state.auth
  return {
    isAuthenticated,
    profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: () => dispatch(loginRequest()),
    onLogoutClick: () => dispatch(logoutSuccess())
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
