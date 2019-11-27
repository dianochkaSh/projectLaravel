import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
/* store */
import userStore from '../../store/UserStore';

inject('userStore');
@observer
class ProfileUser extends Component {
    componentDidMount() {
        userStore.getDataAboutUser();
    }

    render() {
        return(
            <div>
                <p>Profile user</p>
            </div>
        )
    }
}
export default ProfileUser;