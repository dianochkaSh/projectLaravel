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
import ForgetPassword from './src/components/ForgetPassword/ForgetPassword';
import NewPassword from './src/components/ForgetPassword/NewPassword';
const history = createHistory.createBrowserHistory();
const App = () => (
    <Provider{...storesProvider}>
        <Router history={history}>
            <div>
                <Menu />
                <Switch>
                    <Route  exact={true} path="/" component={Home}/>
                    <Route  path="/login" component={Login}/>
                    <Route  path="/signup" component={SignUp}/>
                    <Route  path="/profile" component={ProfileUser}/>
                    <Route  path="/changePassword" component={ChangePassword}/>
                    <Route  path="/forgetPassword" component={ForgetPassword}/>
                    <Route  path="/newPassword/:token/:email" component={NewPassword}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default hot(module)(App);