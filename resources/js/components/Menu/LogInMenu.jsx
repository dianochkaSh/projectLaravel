import * as React from 'react';
import { Link } from 'react-router-dom';

const LogInMenu = (props) => {
    const signOut = () => {
      props.handlerLogOut();
    };
    const username = localStorage.getItem('username');
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/' className="navbar-brand">Home </Link>
                <Link to='setting' className="navbar-brand">Setting </Link>
                <Link to='profile' className="navbar-brand"> {username} </Link>
                <a href="#" onClick={signOut} className="navbar-brand">Sign Out </a>

            </nav>
        </div>
    )
};
export default LogInMenu