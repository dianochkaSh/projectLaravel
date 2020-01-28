import React from 'react';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import storesProvider from './src/store/index';
import { Router, Route, Switch } from 'react-router-dom';
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
import ProductList from './src/components/Products/ProductList/ProductList';
import ProductOne from './src/components/Products/ProductOne/ProductOne';
import Cart from './src/components/Cart/Cart';
import Order from './src/components/Order/Order';
import CheckoutSuccess from './src/components/Order/CheckoutSuccess/CheckoutSuccess';
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
                    <Route  path="/products" component={ProductList}/>
                    <Route  path="/product/oneProduct/:id" component={ProductOne}/>
                    <Route  path="/cart" component={Cart}/>
                    <Route  path="/order" component={Order}/>
                    <Route  path="/checkoutSuccess" component={CheckoutSuccess}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default hot(module)(App);
