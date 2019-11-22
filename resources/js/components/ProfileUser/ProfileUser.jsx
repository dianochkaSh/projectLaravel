import * as React from 'react';
import { Component } from 'react';

class ProfileUser extends Component {
    componentDidMount() {
        console.log(localStorage.getItem('accessToken'));
    }

    render() {
        return(
            <div>
                <p>Profile user</p>
            </div>
        )
    }
}