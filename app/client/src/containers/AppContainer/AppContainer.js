import React from 'react'
import { connect } from 'react-redux'
import { checkLogin, checkTrackMessage, resetErrorMessage } from '../../actions'
import { Header } from '../../components'
import './AppContainer.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    // check if Auth0 lock is authenticating after login callback
    this.props.checkLogin()
    // check for new HTML5 messages coming from content script
    this.props.checkTrackMessage()
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        {/*handle error*/}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  errorMessage: React.PropTypes.string,
  checkLogin: React.PropTypes.func.isRequired,
  checkTrackMessage: React.PropTypes.func.isRequired,
  resetErrorMessage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const errorMessage = state.errorMessage
  return {
    errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin()),
    checkTrackMessage: () => dispatch(checkTrackMessage()),
    resetErrorMessage: () => dispatch(resetErrorMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
