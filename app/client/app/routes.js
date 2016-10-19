import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AuthService from './utils/AuthService';

import App from './components/App';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';

const auth = new AuthService('SyZVm6XmXC4JgIBfw1sj3iHTEdmJ59UC', 'timed.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export default (
  <Route path='/' component={App} auth={auth}>
    <IndexRoute component={HomePage} />
    <Route path='/login' component={LoginPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
);