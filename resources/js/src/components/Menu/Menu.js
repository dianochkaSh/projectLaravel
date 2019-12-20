import * as React from 'react';
import  { Component } from 'react';
import { inject, observer } from 'mobx-react'
import userStore from '../../store/UserStore';

/* components */
import LogInMenu from './LogInMenu';
import LogOutMenu from './LogOutMenu';

inject('userStore');
@observer
class Menu extends Component {
    constructor() {
        super();
        this.signOutUser = this.signOutUser.bind(this);
    }
    componentDidMount() {
        userStore.autoAuth();
    }
    signOutUser (){
        userStore.logout();
    }

    render() {
        const token = userStore.tokenAuth;
        const username = userStore.username;
        return (
            <div>
                { token !== null
                    ? <LogInMenu
                        username={username}
                        handlerLogOut = {() => this.signOutUser()}
                    />
                    : <LogOutMenu/>
                }

            </div>
        );
    }
};

export default Menu;