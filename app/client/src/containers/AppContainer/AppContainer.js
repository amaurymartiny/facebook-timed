import React from 'react'
import { connect } from 'react-redux'
import { checkLogin, checkTrackMessage } from '../../actions'
import { Header } from '../../components'
import './AppContainer.css'

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
        <Header />
        {this.props.children}
        {this.props.errorMessage && <p>{this.props.errorMessage}</p>}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  errorMessage: React.PropTypes.string,
  checkLogin: React.PropTypes.func.isRequired,
  checkTrackMessage: React.PropTypes.func.isRequired
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
    checkTrackMessage: () => dispatch(checkTrackMessage())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
