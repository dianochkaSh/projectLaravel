import * as React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
/* store */
import userStore from '../../store/UserStore';

/* style */
import './ProfileUser.style.css';

/* components */
import EditProfile from './EditProfleUser/EditProfileUser';

inject('userStore');
@observer
class ProfileUser extends Component {
    @observable isOpenModal = false;
    constructor() {
        super();
        this.handlerUploadPhoto = this.handlerUploadPhoto.bind(this);
        this.handlerModalWindow = this.handlerModalWindow.bind(this);
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

    handlerModalWindow(param) {
        this.isOpenModal = param;
    }
    render() {
        return(
            <div className='profile-block'>
                <div className='profile-container'>
                    <p className='profile-user-title'>Profile user</p>
                    <div className='profile-content-left'>
                        { userStore.user.photo === null
                            ? <img src={require('../../assets/img/userPlaceholder.png')} width="200" height="200"/>
                            : <img src={userStore.user.photo} width="200" height="200"/>
                        }


                        { userStore.user.photo === null
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
                            <button onClick={() => this.handlerModalWindow(true)} className="btn btn-primary"> Edit Profile </button>
                        </div>
                    </div>
                </div>
                <EditProfile
                    user = {userStore.user}
                    isOpen={this.isOpenModal}
                    closeWindow={this.handlerModalWindow}
                />
            </div>
        )
    }
}
export default ProfileUser;