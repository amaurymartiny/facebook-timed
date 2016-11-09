import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './store/configureStore'
import createRoutes from './routes'
import muiTheme from './muiTheme'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history} routes={createRoutes()} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
