import * as React from 'react';
import { Component } from 'react';
import { inject, observer, observable } from 'mobx-react';
/* store */
import userStore from '../../store/UserStore';
// import LogoUser from  '';

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
    handlerDeletePhoto() {
        userStore.deletePhotoUser();
    }
    render() {
        return(
            <div className='profile-block'>
                <div className='profile-container'>
                    <p className='profile-user-title'>Profile user</p>
                    <div className='profile-content-left'>
                        { userStore.user.photo === undefined
                            ? <img src={require('../../assets/img/userPlaceholder.png')} width="200" height="200"/>
                            : <img src={userStore.user.photo} width="200" height="200"/>
                        }


                        { userStore.user.photo === undefined
                            ?
                            <div>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    Upload Photo
                                </label>
                                <input id="file-upload" onChange={this.handlerUploadPhoto} type="file"/>
                            </div>
                            :
                            <div>
                                <button
                                    className='btn-delete-photo'
                                    onClick={this.handlerDeletePhoto}
                                >
                                    Delete Photo
                                </button>
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