import React from 'react'
import { connect } from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import { Header, Footer } from '../../components'
import { ErrorContainer } from '../'
import './App.less'

class App extends React.Component {
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
  children: React.PropTypes.element.isRequired
}

// const mapStateToProps = (state) => {
//   const errorMessage = state.errorMessage
//   return {
//     errorMessage
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     checkTrackMessage: () => dispatch(checkTrackMessage())
//   }
// }

export default connect(null, null)(App)
