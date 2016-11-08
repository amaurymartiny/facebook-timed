import React from 'react'
// import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import { LoginContainer } from '../../containers'
import './Header.css'

const Header = () =>
  <AppBar
    title='Timed'
    iconElementRight={<LoginContainer />}
  />

export default Header
