/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory, browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { stringify, parse } from 'qs'

const history = useRouterHistory(createBrowserHistory)({
  parseQueryString: parse,
  stringifyQuery: function (arg) {
    return stringify(arg, { encode: false, indices: false })
  }
})

// Routes
import Routes from './common/components/Routes';

// Base styling
import './common/base.css';


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router
ReactDOM.render((
  <Router history={history}>
    {Routes}
  </Router>
), document.getElementById(DOM_APP_EL_ID));

