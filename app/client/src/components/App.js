import React from 'react'
import HeaderContainer from '../containers/HeaderContainer'

const App = ({ route, children }) =>
  <div>
    <HeaderContainer authService={route.authService}/>
    {children}
  </div>

export default App
