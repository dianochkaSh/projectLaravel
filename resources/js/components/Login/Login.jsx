import React, { Component } from 'react';

/* Components */
import InputField from '../FormElements/InputField/InputField';
import InputButton from '../FormElements/InputButton/InputButton';
import './Login.style.css';
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
                    <InputButton
                        typeBt='button'
                        nameBt='Sign In'
                        handlerBt = {this.signIn}
                    />
                </div>
            </div>
        );
    }
};

export default Login;