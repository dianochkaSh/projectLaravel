import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import GoogleLogin from 'react-google-login';

/* Components */
import InputField from '../FormElements/InputField/InputField';

/* styles */
import './Login.style.css';

/* config */
import { GOOGLE_CLIENT_ID } from '../../constants/costants';

/* store */
import userStore from '../../../src/store/UserStore';

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
        this.handlerSuccessGoogle = this.handlerSuccessGoogle.bind(this);
        this.handlerFailureGoogle = this.handlerFailureGoogle.bind(this);
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

    handlerSuccessGoogle(response) {
        userStore.loginWithGoogle(response);
    }
    handlerFailureGoogle () {

    }
    render() {
        return (
            <div className="login-container">
                <h4>Login</h4>
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
                <div className='login-social-network'>
                    <h4>Or log in using social networks </h4>
                    <div className='login-social-network-content'>

                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText=""
                            onSuccess={this.handlerSuccessGoogle}
                            onFailure={this.handlerFailureGoogle}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;