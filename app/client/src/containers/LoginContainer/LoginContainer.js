import React from 'react'
import { connect } from 'react-redux'
// import IconMenu from 'material-ui/IconMenu'
// import IconButton from 'material-ui/IconButton'
// import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { loginRequest, logoutSuccess } from '../../actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<FlatButton onClick={this.props.onLoginClick} label='Login' />)
    // if (this.props.isAuthenticated)
    //   return(
    //     <IconMenu
    //       iconButtonElement={
    //         <IconButton><MoreVertIcon /></IconButton>
    //       }
    //       targetOrigin={{horizontal: 'right', vertical: 'top'}}
    //       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    //     >
    //       <MenuItem primaryText='Profile' disabled={true} />
    //       <MenuItem primaryText='Sign out' onClick={this.props.onLogoutClick} />
    //     </IconMenu>
    //   )
    // else
    //   return(
    //     <FlatButton onClick={this.props.onLoginClick} label='Login' />
    //   )
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
