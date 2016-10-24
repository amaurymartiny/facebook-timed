import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Auth0Lock from 'auth0-lock'
import { login, logout } from '../actions'
import Header from '../components/Header'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  componentWillMount() {
    // Set the state with a property that has the token
    // console.log('hello')
    // this.setState({idToken: this.getIdToken()})
  }

  // getIdToken() {
  //   // First, check if there is already a JWT in local storage
  //   var idToken = localStorage.getItem('id_token')

  //   if (idToken) return idToken;

  //   // Then check for token hash in URL
  //   var authHash = this.props.route.lock.parseHash(window.location.hash);
  //   // If there is no JWT in local storage and there is one in the URL hash,
  //   // save it in local storage
  //   if (authHash) {
  //     if (authHash.id_token) {
  //       idToken = authHash.id_token
  //       localStorage.setItem('id_token', authHash.id_token);
  //     }
  //     if (authHash.error) {
  //       // Handle any error conditions
  //       console.error("Error signing in", authHash);
  //     }
  //   }
  //   return idToken;
  // }
  
  handleLoginClick() {
    this.props.login()
  }
  
  handleLogoutClick() {
    this.props.logout()
  }

  render() {
    const { isAuthenticated, profile } = this.props
    return (
      <div>
        <div>
          <div>
            <a>Timed</a>
            <Header 
              isAuthenticated={isAuthenticated}
              profile={profile}
              onLoginClick={this.handleLoginClick}
              onLogoutClick={this.handleLogoutClick}
            />
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated, profile } = auth
  return {
    isAuthenticated,
    profile
  }
}

export default connect(mapStateToProps, {
  login,
  logout
})(App)
