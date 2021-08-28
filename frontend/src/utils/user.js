import axios from "axios";
import Cookies from 'js-cookie';
import auth from "./auth";

class User {
    constructor() {
        this.url = "http://localhost:5000";
        this.token = auth.getAuthenticationToken();
    }

    searchUsers(searchString){
      return axios.post('/api/searchUsers', { 
        token:this.token,
        searchString
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    }

    getUserProfile(user_id){
        return axios.post('/api/getUserProfile', { 
          token:this.token,
          user_id:user_id
        })
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.log(err);
          return null;
        })
    }

    getProfileImage(user_id){
        return axios.post('/api/getProfileImage', { 
          token:this.token,
          user_id
        })
        .then(res => {
          return res.data.profileImage;
        })
        .catch(err => {
          console.log(err);
          return null;
        })
    }

    changeName(firstName, lastName){
        return axios.post('/api/changeName', { token:this.token, firstName, lastName })
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.log(err);
          return null;
        })
    }

    uploadProfileImage(){
        return "/api/uploadProfileImage"
    }

    getConnections(user_id){
      return axios.post('/api/getConnections', { 
        token:this.token, 
        user_id })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    }

    getConnectionRequests(){
      return axios.post('/api/getConnectionRequests', { 
        token:this.token
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    }

    checkConnectionState(requested_user_id){
      return axios.post('/api/checkConnectionState', { 
        token:this.token, 
        requested_user_id })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
      /**
       * 0 - not connected
       * 1 - connected
       * 2 - user trying to add requested user
       * 3 - requested user trying to add user
       */
    }

    cancelConnectionRequest(requested_user_id){
      return axios.post('/api/cancelConnectionRequest', { 
        token:this.token, 
        requested_user_id })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    }

    requestConnection(requested_user_id){
      return axios.post('/api/requestConnection', { 
        token:this.token, 
        requested_user_id })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    }

    respondToRequest(requested_user_id, accept){
      return axios.post('/api/respondToRequest', { 
        token:this.token, 
        requested_user_id,
        accept 
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    }

    removeConnection(requested_user_id){
      return axios.post('/api/removeConnection', { 
        token:this.token, 
        requested_user_id })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    }
}

export default new User;