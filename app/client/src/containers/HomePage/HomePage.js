import React from 'react'
import { connect } from 'react-redux'
import { TrackContainer } from '../'
import { LandingPage } from '../../components'

const HomePage = ({ isAuthenticated }) =>
  <div>
    {isAuthenticated ? <TrackContainer /> : <LandingPage />}
  </div>

HomePage.propTypes = {
  isAuthenticated: React.PropTypes.bool
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth
  return {
    isAuthenticated
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     resetErrorMessage: () => dispatch(resetErrorMessage())
//   }
// }

export default connect(mapStateToProps)(HomePage)

