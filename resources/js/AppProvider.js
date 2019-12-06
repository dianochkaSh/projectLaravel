import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import storesProvider from './src/store/index';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import * as createHistory from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

/* components */
import Home from './src/components/Home';
import Menu  from './src/components/Menu/Menu';
import Login from './src/components/Login/Login';
import SignUp from './src/components/SignUp/SignUp';
import ProfileUser from './src/components/ProfileUser/ProfileUser';
import ChangePassword from './src/components/Settings/ChangePassword/ChangePassword';
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
                    <Route  exact={true} path="/profile" component={ProfileUser}/>
                    <Route  exact={true} path="/changePassword" component={ChangePassword}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default hot(module)(App);