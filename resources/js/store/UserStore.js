import { action, observable, runInAction } from 'mobx';
import axios from 'axios';
class UserStore {

  registration (name, email, password) {
      const url = '/api/auth/registration';
      const params = {
          name: name,
          email: email,
          password: password
      };
      axios.post(url, params)
          .then((response) => {
              console.log(response);
          });
  }
 }
 const userStore = new UserStore();
 export default userStore;