import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

/* component */
import InputField from '../FormElements/InputField/InputField';

/* store */
import userStore from '../../store/UserStore';

import './ForgetPassword.style.css';

inject('userStore');
@observer
class NewPassword extends Component {
    @observable passwordNew = null;
    @observable passwordConfirmation = null;
    constructor(){
        super();
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.handlerResetPassword = this.handlerResetPassword.bind(this);
    }
    componentDidMount() {
        userStore.checkTokenUser(this.props.match.params);
    }

    handlerFieldValue = () => {

    };
    handlerResetPassword = () => {

    };
    render() {
        return (
            <div>
                <div className="forget-password-container">
                    <h4>Forget password</h4>
                    <InputField
                        typeField='password'
                        nameFeild='passwordNew'
                        titleField='New password'
                        IdInput="PasswordNew"
                        valueField={this.passwordNew}
                        handlerFiled={this.handlerFieldValue}
                    />
                    <InputField
                        typeField='password'
                        nameFeild='passwordConfirm'
                        titleField='Confirm password'
                        IdInput="PasswordConfirm"
                        valueField={this.passwordConfirmation}
                        handlerFiled={this.handlerFieldValue}
                    />
                    <button type="button" className="btn btn-primary" onClick={this.handlerResetPassword}>Reset Password</button>
                </div>
            </div>
        )
    }
};
export default NewPassword;