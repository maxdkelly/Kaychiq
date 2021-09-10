

import axios from "axios";
import Cookies from 'js-cookie';

class General {
  constructor() {
    this.title = "";
    this.body = [];
  }

  hasRules() {
    return this.title != "";
  }

  setRules(title, body) {
    this.title = title;
    this.body = body;
  }

  removeRules() {
    this.title = "";
    this.body = [];
  }

  getTitle() {
    return this.title;
  }

  getBody() {
    return this.body;
  }

  getToken() {
    return Cookies.get('token')
  }

  hasToken() {

   
    return Cookies.get('token') != undefined;
  }

  removeToken() {
    Cookies.remove('token');
  }

  createGame(username) {
    return axios.post('/api/createGame', {
      username: username
    })
      .then(res => {
           
            if(res.data.isValid) {
              Cookies.set('token', res.data.individualToken, { expires: 1 })
           
            }
            return res.data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  joinGame(username, code) {
    return axios.post('/api/joinGame', {
      username: username,
      code: code
    })
      .then(res => {

            if(res.data.isValid) {

              var twoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
              Cookies.set('token', res.data.individualToken, { expires: twoHours })
            }
            return res.data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  checkGameStarted(token) {
    return axios.post('/api/checkGameStarted', {
        token: token
      })
        .then(res => {
              return res.data;
        })
        .catch(err => {
          console.log(err);
        })

    }

    startGuessGame(token) {
        return axios.post('/api/startGuessGame', {
            token: token
          })
            .then(res => {
                  return res.data;
            })
            .catch(err => {
              console.log(err);
            })
    
      }

    startFlickGame(token) {
      return axios.post('/api/startFlickGame', {
          token: token
        })
          .then(res => {
                return res.data;
          })
          .catch(err => {
            console.log(err);
          })
  
      }

      startBlackout(token) {
        return axios.post('/api/startBlackout', {
            token: token
          })
            .then(res => {
                  return res.data;
            })
            .catch(err => {
              console.log(err);
            })
    
        }

    isHost(token) {
      return axios.post('/api/isHost', {
          token: token
        })
          .then(res => {
                return res.data;
          })
          .catch(err => {
            console.log(err);
          })
  
      }

     leaveGame(token) {
      return axios.post('/api/leaveGame', {
          token: token
        })
          .then(res => {
                return res.data;
          })
          .catch(err => {
            console.log(err);
          })
  
      }
  

  

  
}

export default new General();
