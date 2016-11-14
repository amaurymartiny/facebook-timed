import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button'
import './LandingPage.less'

const LandingPage = () =>
  <Col md={10} mdOffset={1} sm={12} smOffset={0}>
    <Jumbotron>
      <h1>Track the time spent<br />on your favorite webites.</h1>
      <p>With a simple Chrome extension. No configuration, no sign-up necessary, and all for free.</p>
      <p className="text-center"><Button href="http://todo.com" bsSize="large" bsStyle="primary">Download the Chrome Extension</Button></p>
    </Jumbotron>
  </Col>

export default LandingPage
