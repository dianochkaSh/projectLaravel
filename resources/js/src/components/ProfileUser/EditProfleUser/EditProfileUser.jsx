import * as React from 'react';
import Modal from 'react-modal';
import './EditProfile.style.css';

const editProfileUser = (props) => {
    const closeModal = () => {
    props.closeWindow(false);
    };
    return(
        <div>
            <Modal
                isOpen={props.isOpen}
            >
                <div className="edit-profile-container">
                    <img className="close" src={require('../../../assets/img/close.png')} onClick={closeModal}/>
                    <p>Modal window</p>
                </div>
            </Modal>
        </div>
    );

};
export default editProfileUser;
