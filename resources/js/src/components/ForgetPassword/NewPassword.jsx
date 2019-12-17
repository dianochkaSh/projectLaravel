import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import validate from 'validate.js';
import { Link } from 'react-router-dom';

/* component */
import InputField from '../FormElements/InputField/InputField';

/* store */
import userStore from '../../store/UserStore';

import './ForgetPassword.style.css';

/* validation */
import ForgetPasswordValidation from '../validation/ForgetPasswordValidation';

inject('userStore');
@observer
class NewPassword extends Component {
    @observable passwordNew = null;
    @observable passwordConfirmation = null;
    @observable validatePassword = {};
    constructor(){
        super();
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.handlerResetPassword = this.handlerResetPassword.bind(this);
    }
    componentDidMount() {
        userStore.checkTokenUser(this.props.match.params);
    }

    handlerFieldValue = (key, value) => {
        this.validatePassword = {};
        this[key] = value;
    };
    handlerResetPassword = () => {
        let data = {
            passwordNew: this.passwordNew,
            passwordConfirm: this.passwordConfirm
        };
        console.log(data);
        let valid = validate(data, ForgetPasswordValidation);
        if (valid === undefined) {
            userStore.newPassword(this.props.match.params.email, this.passwordNew);
        } else {
            this.validatePassword = valid;
        }
    };
    render() {
        return (
            <div>
                {userStore.tokenIsValid
                    ? <div className="forget-password-container">
                        <h4>Forget password</h4>
                        <InputField
                            typeFiled='password'
                            nameField='passwordNew'
                            titleField='New password'
                            IdInput="PasswordNew"
                            valueField={this.passwordNew}
                            handlerFiled={this.handlerFieldValue}
                        />
                        { this.validatePassword !== undefined && this.validatePassword.passwordNew !== undefined &&
                            <div className="alert alert-danger" role="alert">
                                {this.validatePassword.passwordNew[0]}
                            </div>
                        }
                        <InputField
                            typeFiled='password'
                            nameField='passwordConfirm'
                            titleField='Confirm password'
                            IdInput="PasswordConfirm"
                            valueField={this.passwordConfirmation}
                            handlerFiled={this.handlerFieldValue}
                        />
                        { this.validatePassword !== undefined && this.validatePassword.passwordConfirm !== undefined &&
                            <div className="alert alert-danger" role="alert">
                                {this.validatePassword.passwordConfirm[0]}
                            </div>
                        }
                        <button type="button" className="btn btn-primary" onClick={this.handlerResetPassword}>Reset Password</button>
                        {   userStore.message!== null &&
                        <div className="alert alert-primary">{userStore.message} <Link to="/login">login </Link> and entered.</div>
                        }
                    </div>
                    : <div className="forget-password-container-error">
                        <h4>Please follow the link to almost receive an email to reset your password. </h4>
                        <Link className="link-error" to="/forgetPassword"> Send email</Link>
                    </div>
                }

            </div>
        )
    }
};
export default NewPassword;