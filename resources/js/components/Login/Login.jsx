import React, { Component } from 'react';
import {inject} from 'mobx-react';

/* Components */
import InputField from '../FormElements/InputField/InputField';

/* styles */
import './Login.style.css';

/* store */
import userStore from '../../store/UserStore';

inject('userStore');
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
        this.setState({
            [key]: value
        }, function() {
            console.log(this.state);
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
            </div>
        );
    }
};

export default Login;