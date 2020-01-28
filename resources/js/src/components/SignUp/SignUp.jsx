import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

/* Components */
import InputField from '../FormElements/InputField/InputField';

/* store */
import userStore from '../../store/UserStore';

inject('userStore');
@observer
class SignUp extends Component {
    @observable name = null;
    @observable email = null;
    @observable password = null;
    @observable confirmationPassword = null;

    constructor(props) {
        super(props);
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    handlerFieldValue (key, value) {
        if (userStore.errorMessage !== null) {
            userStore.setErrorMessage(null);
        }
        this[key] =  value;

    };

    signUp () {
        userStore.registration(this.name, this.email, this.password, this.confirmPassword);
    }
    render() {
        if (userStore.isAuthorization === true) {
            this.props.history.push('/profile')
        }
        return (
            <div className="login-container">
                <h4>Sign Up</h4>
                <div>
                    <InputField
                        typeFiled='text'
                        nameField='name'
                        titleField='Name'
                        IdInput='NameInput'
                        valueField = {this.name}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    <InputField
                        typeFiled='text'
                        nameField='email'
                        titleField='E-mail'
                        IdInput='EmailInput'
                        valueField = {this.email}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    <InputField
                        typeFiled='password'
                        nameField='password'
                        titleField='Password'
                        IdInput='PasswordInput'
                        valueField = {this.password}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    <InputField
                        typeFiled='password'
                        nameField='confirmPassword'
                        titleField='Confirm Password'
                        IdInput='ConfirmPasswordInput'
                        valueField = {this.confirmPassword}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.signUp}
                    >
                        Sign Up
                    </button>
                </div>
                <p>{userStore.errorMessage}</p>
            </div>
        );
    }
};

export default SignUp;
