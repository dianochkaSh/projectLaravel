import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import storesProvider from './store/index';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import * as createHistory from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

/* components */
import Home from './components/Home';
import Menu  from './components/Menu/Menu';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
const history = createHistory.createBrowserHistory();
const App = () => (
    <Provider{...storesProvider}>
        <Router history={history}>
            <div>
                <Menu />
                <Switch>
                    <Route  exact={true} path="/" component={Home}/>
                    <Route  exact={true} path="/login" component={Login}/>
                    <Route  exact={true} path="/signup" component={SignUp}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default hot(module)(App);