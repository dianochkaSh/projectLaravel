import * as React from 'react';
import { Link } from 'react-router-dom';
import './LogInMenu.style.css';

const LogInMenu = (props) => {
    const signOut = () => {
      props.handlerLogOut();
    };
    const username = localStorage.getItem('username');
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/' className="navbar-brand">Home </Link>
                <Link to='profile' className="navbar-brand"> {username} </Link>
                <div className="dropdown">
                    <button className="dropbtn">Setting
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <Link to='changePassword'>Changed password</Link>
                    </div>
                </div>
                <a href="#" onClick={signOut} className="navbar-brand singOut">Sign Out </a>
            </nav>
        </div>
    )
};
export default LogInMenu