import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/lib/Alert'
import { resetErrorMessage } from '../../actions'
import './ErrorContainer.less'

const ErrorContainer = ({ errorMessage, resetErrorMessage }) =>
  <div>
    {!!errorMessage && <Alert bsStyle="warning" onDismiss={resetErrorMessage}>
      <p>{errorMessage}. Please <a href="mailto:amaury.martiny@gmail.com">send an email</a> to me with a screenshot so that I can fix this.</p>
    </Alert>}
  </div>

ErrorContainer.propTypes = {
  errorMessage: React.PropTypes.string,
  resetErrorMessage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const errorMessage = state.app.errorMessage
  return {
    errorMessage
  }
}

const mapDispatchToProps = dispatch => ({
  resetErrorMessage: () => dispatch(resetErrorMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)
