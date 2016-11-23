import React, { Component } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import * as reducers from '../Reducers';

import {Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Layout from './Layout'
import List from '../Components/List'
import Article from '../Components/Article'
import { configure, authStateReducer } from 'redux-auth'
import Account from '../Containers/Account';
import SignIn from '../Containers/SignIn';



const requireAuth = (store, nextState, replace, next) => {
  if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
    replace('/login');
  }
  next();
}
export function initialize({ apiUrl, cookies, isServer, currentLocation, userAgent } = {}) {

const reducer = combineReducers({...reducers, routing: routerReducer, auth: authStateReducer});
const store = createStore(reducer, applyMiddleware(
  thunk
  ));
const history = syncHistoryWithStore(browserHistory, store)
const routes = (
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={List}/>
      <Route path="articles/:article_id" component={Article} />
      <Route path="login" component={SignIn} />
      <Route
        onEnter={requireAuth.bind(this, store)}
        component={Account}
        path="account"
      />
    </Route>
  </Router>
)
return store.dispatch(configure([
  {
    default: { apiUrl,
     }
  }, {
    evilUser: {
      apiUrl,
      signOutPath: '/mangs/sign_out',
      emailSignInPath: '/mangs/sign_in',
      emailRegistrationPath: '/mangs',
      accountUpdatePath: '/mangs',
      accountDeletePath: '/mangs',
      passwordResetPath: '/mangs/password',
      passwordUpdatePath: '/mangs/password',
      tokenValidationPath: '/mangs/validate_token',
      authProviderPaths: {
        github: '/mangs/github',
        facebook: '/mangs/facebook',
        google: '/mangs/google_oauth2'
      }
    }
  }
], {
  cookies,
  isServer,
  currentLocation
})).then(({ redirectPath, blank } = {}) => {
  if (userAgent) {
    global.navigator = { userAgent };
  }

  return ({
    blank,
    store,
    redirectPath,
    routes,
    history,
    provider: (
      <Provider store={store} key="provider" children={routes} />
    )
  });
});
}
