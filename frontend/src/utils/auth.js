import axios from "axios";
import Cookies from 'js-cookie';

class Auth {
  constructor() {
    this.url = "http://localhost:5000";
  }

  signup(email, firstName, lastName, password) {
    return axios.post('/api/signup', {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      })
  }

  login(email, password) {
    return axios.post('/api/login', {
      email,
      password
    })
      .then(res => {
        if (res.data.success){
          Cookies.set('auth', res.data.auth_token)
        }
        return res.data
      })
      .catch(err => {
        console.log(err);
        return null;
      })
  }

  logout(token) {
    return axios.post('/api/logout', { token })
      .then(res => {
        if(res.data.success === true){
          Cookies.remove("auth");
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  forgotPassword(email) {
    return axios.post('/api/resetRequest', { email })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
  }

  changePassword(email, oldPassword, newPassword) {
    return axios.post('/api/changePassword', {
      email,
      oldPassword,
      newPassword
    })
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log(err);
        return null;
      })
  }

  isAuthenticated() {
    let token = Cookies.get('auth');
    if (token === undefined) { return false }
    return axios.post('/api/isAuthenticated', { token })
      .then(res => {
        console.log(res.data.success);
        return res.data.success
      })
      .catch(_ => {return false})
  }

  verifyResetToken(resetToken) {
    return axios.post('/api/verifyResetToken', { resetToken })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      })
  }

  resetPassword(resetToken, password) {
    return axios.post('/api/passwordReset', { resetToken, password })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      })
  }

  getAuthenticationToken(){
    let token = Cookies.get('auth');
    return token;
  }
}

export default new Auth();
