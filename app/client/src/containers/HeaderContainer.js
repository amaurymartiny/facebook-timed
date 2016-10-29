import { connect } from 'react-redux'
import { loginRequest, loginSuccess, loginError, logoutSuccess } from '../actions'
import HeaderComponent from '../components/HeaderComponent'

const mapStateToProps = (state, ownProps) => {
  const { isAuthenticated, profile } = state.auth
  return {
    authService: ownProps.authService,
    isAuthenticated,
    profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (authService) => dispatch(loginRequest(authService)),
    onLogoutClick: (authService) => dispatch(logoutSuccess(authService))
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)

export default HeaderContainer
