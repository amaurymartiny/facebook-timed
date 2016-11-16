import React from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button'
import { Link } from 'react-router'
import { ExtensionConnected } from '../../components'
import { loginRequest as loginRequestAction } from '../../actions'
import './HomePage.less'

const HomePage = ({ isAuthenticated, isExtensionConnected, loginRequest }) =>
  <Col md={10} mdOffset={1} sm={12} smOffset={0}>
    <Jumbotron>
      <h1>Track the time spent<br />on your favorite websites.</h1>
      <p>
        With a simple Chrome extension.
        No configuration, no sign-up necessary, and all for free.
      </p>
      <div className="text-center">
        {
          isExtensionConnected ?
            <div className="cta">
              <ExtensionConnected isExtensionConnected={isExtensionConnected} />
              {isAuthenticated ?
                <Link to="/dashboard">
                  <Button bsSize="large" bsStyle="success">Go to my Dashboard</Button>
                </Link>
              :
              <Button onClick={loginRequest} bsSize="large" bsStyle="primary">Log In or Sign Up</Button>
              }
            </div>
          : <Button href="http://todo.com" bsSize="large" bsStyle="primary">
            Download the Chrome Extension
          </Button>
        }
      </div>
    </Jumbotron>
  </Col>

HomePage.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  isExtensionConnected: React.PropTypes.bool,
  loginRequest: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth
  const { isExtensionConnected } = state.app
  return {
    isAuthenticated,
    isExtensionConnected
  }
}

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(loginRequestAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

