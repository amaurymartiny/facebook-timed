import React from 'react'
import { connect } from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import { checkTrackMessage, resetErrorMessage } from '../../actions'
import { Header } from '../../components'
import { ErrorContainer } from '../'
import './App.less'

class App extends React.Component {
  componentWillMount() {
    // check for new HTML5 messages coming from content script
    this.props.checkTrackMessage()
  }

  render() {
    return (
      <div>
        <Header />
        <Grid fluid>
          <ErrorContainer />
          {this.props.children}
        </Grid>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  errorMessage: React.PropTypes.string,
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
    checkTrackMessage: () => dispatch(checkTrackMessage()),
    resetErrorMessage: () => dispatch(resetErrorMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
