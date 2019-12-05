import React, { Component } from 'react';
import Modal from 'react-modal';
import validate from 'validate.js';
import './EditProfile.style.css';

/* components */
import InputElement from '../../FormElements/InputField/InputField';
/* validation */
import editFormValidation from '../../validation/EditFormValidation';
import userStore from '../../../store/UserStore';
import { inject, observer } from 'mobx-react';
import { observable, reaction } from 'mobx';

inject('userStore');
@observer
class editProfileUser extends Component{
    @observable validation = {};
    @observable email = '';
    @observable name = '';
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.handlerEditUser = this.handlerEditUser.bind(this);
        this.setUserData = this.setUserData.bind(this);
        reaction(() => this.props.isOpen, () => {
            this.setUserData();
        });
    }
    closeModal = () => {
        this.props.closeWindow(false);
    };
    handlerFieldValue = (key, value) => {
        this[key] = value;
    };
    handlerEditUser = () => {
        let data = {
            email: this.email,
            name: this.name
        };

        let valid = validate(data, editFormValidation);
        console.log(valid);
        if (valid === undefined) {
            userStore.editUser(data);
        }
    };
    setUserData = () => {
       this.name = this.props.user.name;
       this.email = this.props.user.email;
    };
    render() {
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)',
                width                 :  '47%'
            }
        };

        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    style={customStyles}
                >
                    <div className="edit-profile-container">
                        <img className="close" src={require('../../../assets/img/close.png')} onClick={this.closeModal}/>
                        <div>
                            <InputElement
                                typeFiled='text'
                                nameField='name'
                                titleField='Name'
                                IdInput='NameInput'
                                valueField={this.name}
                                handlerFiled={this.handlerFieldValue}
                            />
                            <InputElement
                                typeFiled='text'
                                nameField='email'
                                titleField='E-mail'
                                IdInput='EmailInput'
                                valueField={this.email}
                                handlerFiled={this.handlerFieldValue}
                            />
                            <button className="btn btn-primary" onClick={this.handlerEditUser}>Edit</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

};
export default editProfileUser;
