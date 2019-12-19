import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '../constants/costants';
class UserStore {
    @observable errorMessage = null;
    @observable isAuthorization = undefined;
    @observable message = null;
    @observable tokenAuth = null;
    @observable username = null;
    @observable user = {};
    @observable tokenIsValid = false;
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
                this.isAuthorization = true;
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
                this.setDataAfterEntering(response.data);
                this.isAuthorization = true;
                //window.location.href= '/profile';
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
                localStorage.removeItem('username');
                this.isAuthorization = false;
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
                    this.user.name = response.data.name;
                    this.username = response.data.name;
                    this.user.email = response.data.email;
                    this.user.photo = response.data.photo;
                    this.user.id = response.data.id;
                    this.user.provider = response.data.provider;
                    localStorage.setItem('username', response.data.name);
                }
            })
            .catch((error)=> {
                this.isAuthorization = false;
            })
    }
    @action uploadPhotoUser (file) {
         const data = new FormData();
         data.append('file', file);
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        axios.post('/api/user/uploadPhoto', data, { headers: headers })
            .then((response) => {
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
                   this.user.photo = null;
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
    @action loginWithGoogle(data) {
        const params = {
            email : data.profileObj.email,
            name : data.profileObj.name,
            provider: 'google',
            provider_id: data.profileObj.googleId,
            photo : data.profileObj.imageUrl,
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        };
        axios.post('/api/auth/google/login', params)
            .then((response) => {
                this.setDataAfterEntering(response.data);
                this.isAuthorization = true;
            });

    }
    @action loginWithFacebook (data) {
        const params = {
            email : data.email,
            name : data.name,
            provider: 'facebook',
            provider_id: data.id,
            photo : data.picture.data.url,
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        };
        axios.post('/api/auth/facebook/login', params)
            .then((response) => {
                this.setDataAfterEntering(response.data);
                this.isAuthorization = true;
            });
    }
    @action sendLetterForChangePassword(email) {
        axios.get('api/auth/chanSendLetterForChangePass/'+ email )
            .then((response) => {
                if (response.status === 200) {
                    this.message = response.data.success;
                }
            });
    }
    @action checkTokenUser(params) {
        let data = {
            email: params.email,
            token: params.token
        };
        axios.post('/api/auth/checkTokenUser', data)
            .then((response) => {
                if (response.status === 200) {
                    this.tokenIsValid = true;
                }
            })
    }
    @action newPassword(email, password) {
        let data = {
          email:    email,
          password: password
        };
        axios.post('/api/auth/newPassword', data)
            .then((response) => {
              if (response.status === 200) {
                  this.message = response.data.success;
              }
            })
    }

}
 const userStore = new UserStore();
 export default userStore;