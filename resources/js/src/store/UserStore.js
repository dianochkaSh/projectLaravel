import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../constants/costants';
class UserStore {
    @observable errorMessage = null;
    @observable message = null;
    @observable tokenAuth = null;
    @observable username = null;
    @observable user = {};
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
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        axios.get('/api/logout',{ headers: headers })
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
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        axios.get('/api/user/getUser', { headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.user.name = response.data.name;
                    this.user.email = response.data.email;
                    this.user.photo = response.data.photo;
                    this.user.id = response.data.id;
                    localStorage.setItem('username', response.data.name);
                }
            });
    }
    @action uploadPhotoUser (file) {
         const data = new FormData();
         data.append('file', file);
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        axios.post('/api/user/uploadPhoto', data, { headers: headers })
            .then((response) => {
               console.log(response);
               if (response.status === 200) {
                   this.user.photo = response.data.photo;
               }

            });
    }
    @action deletePhotoUser() {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        axios.get('/api/user/deletePhoto',{ headers: headers })
            .then((response)=> {
               if (response.status === 200) {
                   this.user.photo = undefined;
               }
            });
    }
    @action editUser(data) {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        data.id = this.user.id;
        axios.put('api/user/editUser', data, {headers: headers} )
            .then((response) => {
                if (response.status === 200) {
                    this.message  = response.data.success;
                    this.getDataAboutUser();
                }
            });
    }
    @action setMessage(error) {
        this.message = error;
    }
    @action changePasswordUser(data) {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        let params = {
            oldPassword: data.password,
            newPassword: data.passwordNew,
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: ''
        };
        axios.post('api/user/changePassword', params , {headers: headers})
            .then((response) => {
                if (response.status === 200) {
                    this.message  = response.data.success;
                }
            })
    }
}
 const userStore = new UserStore();
 export default userStore;