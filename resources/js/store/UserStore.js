import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../constants/costants';
class UserStore {
    @observable accessToken = 0;
    @observable errorMessage = null;

    @action registration(name, email, password) {
        const url = '/api/auth/registration';
        const params = {
            name: name,
            email: email,
            password: password
        };
        axios.post(url, params)
            .then((response) => {
                console.log(response);
                this.accessToken = response.data.success.token;
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
                return response;
                this.accessToken = response.data.success.token;
            })
            .catch(error => {
                this.setErrorMessage(error.response.data.error);
            });
    }

    @action logout() {
        axios.get('/api/auth/logout')
            .then((response) => {
                console.log(response);
            });
    }

    @action setErrorMessage(error) {
        this.errorMessage = error;
    }
}
 const userStore = new UserStore();
 export default userStore;