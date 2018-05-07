// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

// Assets
import './scss/index.css';

// Routers
import Home from './routers/home';
import Search from './routers/search';
import MyBooks from './routers/my-books';

// Service Worker
import registerServiceWorker from './registerServiceWorker';

moment.locale('pt-BR');
moment.tz.setDefault("America/Sao_Paulo");

let rootElement = document.getElementById( 'root' );
if(rootElement == null) throw new Error('No Root');

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/search/:book?" component={Search}/>
            <Route exact path="/my-books" component={MyBooks}/>
        </Switch>
    </Router>,
    rootElement
);

registerServiceWorker();
