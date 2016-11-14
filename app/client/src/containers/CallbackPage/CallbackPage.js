import React from 'react'
import { connect } from 'react-redux'
import { checkLogin, loginSuccess } from '../../actions'

class CallbackPage extends React.Component {
  componentWillMount() {
    // if we are already logged in, then redirect to homepage
    if (this.props.isAuthenticated) {
      return this.props.loginSuccess(this.props.profile)
    }
    // check if Auth0 lock is authenticating after login callback
    this.props.checkLogin()
  }

  render() {
    return (
      <div className="text-center">
        Redirecting... Please wait a short moment while we are logging you in.
      </div>
    )
  }
}

CallbackPage.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  profile: React.PropTypes.object,
  checkLogin: React.PropTypes.func.isRequired,
  loginSuccess: React.PropTypes.func.isRequired
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
    checkLogin: () => dispatch(checkLogin()),
    loginSuccess: (profile) => dispatch(loginSuccess(profile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallbackPage)
