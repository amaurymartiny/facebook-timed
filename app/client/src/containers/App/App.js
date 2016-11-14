import React from 'react'
import { connect } from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import { checkExtensionMessages } from '../../actions'
import { Header, Footer } from '../../components'
import { ErrorContainer } from '../'
import './App.less'

class App extends React.Component {
  componentWillMount() {
    // check for new HTML5 messages coming from content script
    this.props.checkExtensionMessages()
  }

  render() {
    return (
      <div>
        <Header />
        <Grid fluid>
          <ErrorContainer />
          {this.props.children}
        </Grid>
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  checkExtensionMessages: React.PropTypes.func.isRequired
}

// const mapStateToProps = (state) => {
//   const errorMessage = state.errorMessage
//   return {
//     errorMessage
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    checkExtensionMessages: () => dispatch(checkExtensionMessages())
  }
}

export default connect(null, mapDispatchToProps)(App)
