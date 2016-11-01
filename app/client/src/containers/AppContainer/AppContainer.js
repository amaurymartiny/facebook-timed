import React from 'react'
import { connect } from 'react-redux'
import { checkLogin } from '../../actions'
import { HeaderContainer } from '../'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  render() {
    return(
      <div>
        <HeaderContainer />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  checkLogin: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

const AppContainer = connect(
  null, // no mapStateToProps
  mapDispatchToProps
)(App)

export default AppContainer
