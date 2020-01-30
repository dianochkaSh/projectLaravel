import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

/* component */
import InputField from '../FormElements/InputField/InputField';

/* store */
import userStore from '../../store/UserStore';

/* style */
import './ForgetPassword.style.css';

inject('userStore');
@observer
 class ForgetPassword extends Component {
    @observable email = null;
    constructor(props) {
        super(props);
        this.handlerFieldValue = this.handlerFieldValue.bind(this);
        this.handlerSendLetter = this.handlerSendLetter.bind(this);
    }
    componentDidMount() {
        userStore.setMessage(null);
    }

    handlerFieldValue = (key, value) => {
        userStore.setMessage(null);
        this.email = value
    };
    handlerSendLetter = () => {
        userStore.sendLetterForChangePassword(this.email);
    };
     render() {
         return (
             <div>
                 <div className="forget-password-container">
                     <h4>Forget password</h4>
                     <div className="forget-password-content">
                         <InputField
                             typeField='text'
                             nameFeild='email'
                             titleField='E-mail'
                             IdInput="Email"
                             valueField={this.email}
                             handlerFiled={this.handlerFieldValue}
                         />
                         <button type="button" className="btn btn-primary" onClick={this.handlerSendLetter}>Send Letter</button>
                     </div>
                     { userStore.message !== null &&
                         <div className="alert alert-primary" role="alert">
                             {userStore.message}
                         </div>
                     }
                 </div>
             </div>
         )
     };
 };
 export default ForgetPassword;
