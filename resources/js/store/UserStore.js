import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../constants/costants';
class UserStore {
    @observable errorMessage = null;
    @observable tokenAuth = null;
    @observable username = null;
    @action registration(name, email, password) {
        const url = '/api/auth/registration';
        const params = {
            name: name,
            email: email,
            password: password,
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: ''
        };
        axios.post(url, params)
            .then((response) => {
                this.setDataAfterEntering(response.data);
                window.location.href= '/profile';
            })
            .catch((error)=> {
                let errors = [];
                let keys = Object.keys(error.response.data.error);
                keys.map(function(key) {
                    errors.push(error.response.data.error[key][0]);
                });
                let strErrors = errors.join(',');
                this.setErrorMessage(strErrors);
            });
    }

    @action login(email, password) {
        const url = '/api/auth/login';
        const params = {
            username: email,
            password: password,
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: ''
        };
        axios.post(url, params)
            .then((response) => {
                console.log(response);
                this.setDataAfterEntering(response.data);
                window.location.href= '/profile';
            })
            .catch(error => {
                this.setErrorMessage(error.response.data.error);
            });
    }

    @action logout() {
        axios.get('/api/auth/logout')
            .then((response) => {
                this.tokenAuth = null;
                this.username = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expiresIn');
                localStorage.removeItem('refreshToken');
                window.location.href= '/';
            });
    }

    @action setErrorMessage(error) {
        this.errorMessage = error;
    }
    @action autoAuth() {
        this.tokenAuth = localStorage.getItem('accessToken');
        this.username = localStorage.getItem('username');
    }
    @action setDataAfterEntering (data) {
        this.tokenAuth = data.token;
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('expiresIn', data.expires_in);
        localStorage.setItem('refreshToken', data.refresh_token);
    }
    @action getDataAboutUser () {
        axios.get('/api/user/getUser/12')
            .then((response) => {
                console.log(response);
            })
    }
}
 const userStore = new UserStore();
 export default userStore;