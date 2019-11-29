import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
/* store */
import userStore from '../../store/UserStore';
import LogoUser from  '../../../../public/assets/img/userPlaceholder.png';

/* style */
import './ProfileUser.style.css';

inject('userStore');
@observer
class ProfileUser extends Component {
    constructor() {
        super();
        this.handlerUploadPhoto = this.handlerUploadPhoto.bind(this);
    }
    componentDidMount() {
        userStore.getDataAboutUser();
    }

    handlerUploadPhoto() {
       userStore.uploadPhotoUser(event.target.files[0]);
    }
    render() {
        const photo = userStore.user.photo !== undefined ? require('../../../../storage/app/'+ userStore.user.photo): LogoUser;
        return(
            <div className='profile-block'>
                <div className='profile-container'>
                    <p className='profile-user-title'>Profile user</p>
                    <div className='profile-content-left'>
                        <img src={photo} width="200" height="200"/>

                        {userStore.user.photo === undefined
                            ?
                            <div>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    Upload Photo
                                </label>
                                <input id="file-upload" onChange={this.handlerUploadPhoto} type="file"/>
                            </div>
                            :
                            <div>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    Delete Photo
                                </label>
                                <input id="file-upload" type="file"/>
                            </div>
                        }
                    </div>
                    <div>
                        <div className='info-left-content'>
                            <label>Name:</label>
                            <label>E-mail:</label>
                        </div>
                        <div className='info-right-content'>
                            <label>{userStore.user.name}</label>
                            <label>{userStore.user.email}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfileUser;