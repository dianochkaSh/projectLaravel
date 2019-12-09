import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, reaction } from 'mobx';
import userStore from '../../../store/UserStore';
import validate from 'validate.js';

/* components */
import InputElement from '../../FormElements/InputField/InputField';

/* style */
import './ChangePassword.style.css';

/* validation */
import ChangePasswordValidation from '../../validation/ChangePasswordValidation';

inject('userStore');
@observer
class changePassword extends Component {
    @observable password = null;
    @observable passwordNew = null;
    @observable passwordConfirm = null;
    @observable validate = {};
    constructor(props) {
        super(props);
        this.handlerField = this.handlerField.bind(this);
        this.handlerChangePassword = this.handlerChangePassword.bind(this);
        this.setZeroUserValue = this.setZeroUserValue.bind(this);
        reaction(() => userStore.message, () => {
            this.setZeroUserValue();
        });
    }
    handlerField = (key, value) => {
        if (userStore.message !== null) {
            userStore.setMessage(null);
        }
        this.validate = {};
        this[key] = value;
    };
    handlerChangePassword = () => {
        let data = {
            password: this.password,
            passwordNew: this.passwordNew,
            passwordConfirm: this.passwordConfirm
        };

        let valid = validate(data, ChangePasswordValidation);
        if (valid === undefined) {
            userStore.changePasswordUser(data);
        } else {
            this.validate = valid;
        }
    };
    setZeroUserValue = () => {
        this.password = '';
        this.passwordNew = '';
        this.passwordConfirm = '';
    };
    render() {
        return (
            <div className='change-password-container'>
                <div className='change-password-content'>
                    <h2>Change password</h2>
                    <InputElement
                        typeFiled='password'
                        nameField='password'
                        titleField='Old password'
                        IdInput='PasswordInput'
                        valueField={this.password}
                        handlerFiled={this.handlerField}
                    />
                    { this.validate !== undefined && this.validate.password !== undefined &&
                        <div className="alert alert-danger" role="alert">
                            {this.validate.password[0]}
                        </div>
                    }
                    <InputElement
                        typeFiled='password'
                        nameField='passwordNew'
                        titleField='New password'
                        IdInput='NewPasswordInput'
                        valueField={this.passwordNew}
                        handlerFiled={this.handlerField}
                    />
                    { this.validate !== undefined && this.validate.passwordNew !== undefined &&
                        <div className="alert alert-danger" role="alert">
                            {this.validate.passwordNew[0]}
                        </div>
                    }
                    <InputElement
                        typeFiled='password'
                        nameField='passwordConfirm'
                        titleField='Confirmation password'
                        IdInput='ConfirmPasswordInput'
                        valueField={this.passwordConfirm}
                        handlerFiled={this.handlerField}
                    />
                    { this.validate !== undefined && this.validate.passwordConfirm !== undefined &&
                        <div className="alert alert-danger" role="alert">
                            {this.validate.passwordConfirm[0]}
                        </div>
                    }
                    <button onClick={this.handlerChangePassword} className="btn btn-primary">Change password</button>
                </div>
                <div>
                    {(userStore.message !== undefined && userStore.message !== null) &&
                        <div className="alert alert-primary" role="alert">{userStore.message}</div>
                    }
                </div>

            </div>
        )
    }

};
export default changePassword;