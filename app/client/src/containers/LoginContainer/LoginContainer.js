import React from 'react'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Download from 'material-ui/svg-icons/file/file-download'
import { loginRequest, logoutSuccess } from '../../actions'

class Login extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton>
              <Avatar
                icon={<FileFolder />}
                size={30}
              />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText='Profile' disabled={true} leftIcon={<Download />} />
          <MenuItem primaryText='Sign out' onClick={this.props.onLogoutClick} leftIcon={<Download />} />
        </IconMenu>
      )
    }
    return (
      <FlatButton onClick={this.props.onLoginClick} label='Login' />
    )
  }

  static muiName = 'FlatButton'
}

Login.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth
  return {
    isAuthenticated,
    profile,
    error
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
