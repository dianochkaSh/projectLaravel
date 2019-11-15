import React, { Component } from 'react';

/* Components */
import InputField from '../FormElements/InputField/InputField';
import InputButton from '../FormElements/InputButton/InputButton';
import { inject, observer } from 'mobx-react';
import userStore from '../../store/UserStore';

inject('userStore');
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            email: null,
            password: null,
            confirmPassword: null
        };
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    handlerFieldValue (key, value) {
        this.setState({
            [key]: value
        }, function() {

        });

    };

    signUp () {
        //if(!isNaN(this.state.name) && !isNaN(this.state.email)&& !isNaN(this.state.password) && !isNaN(this.state.confirmPassword)) {
            userStore.registration(this.state.name, this.state.email, this.state.password, this.state.confirmPassword);
        //}
    }
    render() {
        return (
            <div className="login-container">
                <p>Sign Up</p>
                <div>
                    <InputField
                        typeFiled='text'
                        nameField='name'
                        titleField='Name'
                        IdInput='NameInput'
                        valueField = {this.state.name}
                        handlerFiled = {this.handlerFieldValue}
                    />
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
                    <InputField
                        typeFiled='password'
                        nameField='confirmPassword'
                        titleField='Confirm Password'
                        IdInput='ConfirmPasswordInput'
                        valueField = {this.state.confirmPassword}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    <button className="bt-for-show-pass" onClick={this.signUp}> Sign Up</button>
                </div>
            </div>
        );
    }
};

export default SignUp;