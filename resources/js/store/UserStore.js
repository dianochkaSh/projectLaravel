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
            password: password
        };
        axios.post(url, params)
            .then((response) => {
                this.setDataAfterEntering(response.data.success);
                window.location.href= '/';
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
            email: email,
            password: password,
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        };
        axios.post(url, params)
            .then((response) => {
                this.setDataAfterEntering(response.data.success);
                window.location.href= '/';
            })
            .catch(error => {
                this.setErrorMessage(error.response.data.error);
            });
    }

    @action logout() {
        axios.get('/api/auth/logout')
            .then((response) => {
                this.tokenAuth = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expiresAt');
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
        this.username = data.name;
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('username', data.name);
        localStorage.setItem('expiresAt', data.expires_at);
    }
}
 const userStore = new UserStore();
 export default userStore;