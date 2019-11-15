import * as React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='login' className="navbar-brand">Login </Link>
                <Link to='signup' className="navbar-brand">Sign Up </Link>
                <Link to='/' className="navbar-brand">Home </Link>
            </nav>
        </div>
    );
};

export default Menu;