import * as React from 'react';
import { Link } from 'react-router-dom';

const LogInMenu = (props) => {
    const signOut = () => {
      props.handlerLogOut();
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/' className="navbar-brand">Home </Link>
                <Link to='setting' className="navbar-brand">Setting </Link>
                <Link to='' className="navbar-brand"> {props.username} </Link>
                <a href="#" onClick={signOut} className="navbar-brand">Sign Out </a>

            </nav>
        </div>
    )
};
export default LogInMenu