import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import validate from 'validate.js';

/* Components */
import InputField from '../FormElements/InputField/InputField';

/* styles */
import './Login.style.css';

/* config */
import { GOOGLE_CLIENT_ID, FACEBOOK_ID } from '../../constants/costants';

/* store */
import userStore from '../../../src/store/UserStore';

/* validation */
import LoginValidation from '../validation/LoginValidation';


inject('userStore');
@observer
class Login extends Component {
    @observable email = '';
    @observable password = '';
    @observable validateLogin = {};
    constructor(props) {
        super(props);
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handlerSuccessGoogle = this.handlerSuccessGoogle.bind(this);
        this.handlerFailureGoogle = this.handlerFailureGoogle.bind(this);
        this.handlerSuccessFacebook = this.handlerSuccessFacebook.bind(this);
    }
    componentDidMount() {
        userStore.setErrorMessage(null);
    }


    handlerFieldValue = (key, value) => {
        if (userStore.errorMessage !== null) {
            userStore.setErrorMessage(null);
        }
        this[key] = value;
        this.validateLogin = {};
    };
    signIn = () => {
        let data = {
          email: this.email,
          password: this.password
        };
        let valid = validate(data, LoginValidation);
        if (valid === undefined) {
            userStore.login(this.email, this.password);
            this.password = null;
        } else {
            this.validateLogin = valid;
        }
    };

    handlerSuccessGoogle = (response) => {
        userStore.loginWithGoogle(response);
    };
    handlerFailureGoogle () {

    }
    handlerSuccessFacebook = (response) => {
        userStore.loginWithFacebook(response);
    };
    render() {
        if (userStore.isAuthorization === true) {
           this.props.history.push('/profile')
        }
        return (
            <div className="login-container">
                <h4>Login</h4>
                <div>
                    <InputField
                        typeFiled='text'
                        nameField='email'
                        titleField='E-mail'
                        IdInput='EmailInput'
                        valueField = {this.email}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    {
                        this.validateLogin !== undefined && this.validateLogin.email !== undefined &&
                        <div className="alert alert-danger" role="alert">{this.validateLogin.email}</div>
                    }
                    <InputField
                        typeFiled='password'
                        nameField='password'
                        titleField='Password'
                        IdInput='PasswordInput'
                        valueField = {this.password}
                        handlerFiled = {this.handlerFieldValue}
                    />
                    {
                        this.validateLogin !== undefined && this.validateLogin.password !== undefined &&
                        <div className="alert alert-danger" role="alert">{this.validateLogin.password}</div>
                    }
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.signIn}
                    >
                        Sign In
                    </button>
                </div>
                {
                    userStore.errorMessage !== null &&
                    <div className="alert alert-danger" role="alert">{userStore.errorMessage}</div>
                }

                <div className='link-forget-pass'>
                    <Link to="/forgetPassword"> Forgot password? </Link>
                </div>
                <div className='login-social-network'>
                    <h4>Or log in using social networks </h4>
                    <div className='login-social-network-content'>
                        <span className='googleBt'>
                            <GoogleLogin
                                clientId={GOOGLE_CLIENT_ID}
                                buttonText=""
                                onSuccess={this.handlerSuccessGoogle}
                                onFailure={this.handlerFailureGoogle}
                            />
                        </span>
                        <FacebookLogin
                            appId={FACEBOOK_ID}
                            fields="name,email,picture"
                            callback={this.handlerSuccessFacebook}
                            icon="fa-facebook"
                            textButton=""
                            size="small"
                        />
                    </div>
                </div>
            </div>
        );
    };
};

export default Login;
