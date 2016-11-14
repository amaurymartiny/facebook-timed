import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import { LoginContainer } from '../../containers'

const Header = () =>
  <Navbar collapseOnSelect fluid>
    <Navbar.Header>
      <Navbar.Brand>Timed</Navbar.Brand>
      {/*<Navbar.Toggle />*/}
    </Navbar.Header>
    <Nav pullRight>
      <LoginContainer />
    </Nav>
    {/*<Navbar.Collapse></Navbar.Collapse>*/}
  </Navbar>

export default Header
