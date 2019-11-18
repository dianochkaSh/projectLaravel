import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

/* Components */
import InputField from '../FormElements/InputField/InputField';

/* styles */
import './Login.style.css';

/* store */
import userStore from '../../store/UserStore';

inject('userStore');
@observer
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    handlerFieldValue (key, value) {
        if (userStore.errorMessage !== null) {
            userStore.setErrorMessage(null);
        }
        this.setState({
            [key]: value
        });
    };
    signIn () {
        userStore.login(this.state.email, this.state.password);
    }
    render() {
        return (
            <div className="login-container">
                <p>Login</p>
                <div>
                    <InputField
                        typeFiled='text'
                        nameField='email'
                        titleField='E-mail'
                        IdInput='EmailInput'
                        valueField = {this.state.email}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    <InputField
                        typeFiled='password'
                        nameField='password'
                        titleField='Password'
                        IdInput='PasswordInput'
                        valueField = {this.state.password}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.signIn}
                    >
                        Sign In
                    </button>
                </div>
                <p>{userStore.errorMessage}</p>
            </div>
        );
    }
};

export default Login;