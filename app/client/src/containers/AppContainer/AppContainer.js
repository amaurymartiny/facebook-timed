import React from 'react'
import { connect } from 'react-redux'
import { checkLogin, checkTrackMessage } from '../../actions'
import { HeaderContainer } from '../'

class App extends React.Component {
  constructor(props) {
    super(props)
    // check if Auth0 lock is authenticating after login callback
    this.props.checkLogin() 
    // check for new HTML5 messages coming from content script
    this.props.checkTrackMessage()
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
  checkLogin: React.PropTypes.func.isRequired,
  checkTrackMessage: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin()),
    checkTrackMessage: () => dispatch(checkTrackMessage())
  }
}

const AppContainer = connect(
  null, // no mapStateToProps
  mapDispatchToProps
)(App)

export default AppContainer
