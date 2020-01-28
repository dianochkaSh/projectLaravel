import * as React from 'react';
import  { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

/* store */
import userStore from '../../store/UserStore';

/* style */
import './LogInMenu.style.css';

inject('userStore');
@observer
class LogInMenu extends Component{
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut = () => {
      this.props.handlerLogOut();
    };
    render() {
        let countProductInCart = userStore.cartIdsProduct.length;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/' className="navbar-brand">Home </Link>
                    <Link to='profile' className="navbar-brand"> {userStore.username} </Link>
                    <div className="dropdown">
                        <button className="dropbtn">Setting
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <Link to='changePassword'>Changed password</Link>
                        </div>
                    </div>
                    <Link to='/products' className="navbar-brand">Products</Link>
                    <Link to='/cart'> <img src={require('../../assets/img/cart.png')}/><sub className="count-product-in-cart">{countProductInCart}</sub> </Link>
                    <a href="#" onClick={this.signOut} className="navbar-brand singOut">Sign Out </a>
                </nav>
            </div>
        );
    };
};
export default LogInMenu
