import React from 'react';
import ReactDOM from 'react-dom';

import Home from '../home';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

it( 'renders without crashing', () => {

  const div = document.createElement( 'div' );

  ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>
    </Router>
    , div );

  ReactDOM.unmountComponentAtNode( div );

} );
