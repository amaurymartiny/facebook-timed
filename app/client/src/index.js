import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './store/configureStore'
import createRoutes from './routes'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={createRoutes()} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
