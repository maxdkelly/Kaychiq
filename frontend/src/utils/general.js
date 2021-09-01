import axios from "axios";
// import Cookies from 'js-cookie';

class General {
  constructor() {
    
  }

  createGame(username) {
    return axios.post('/api/createGame', {
      username: username
    })
      .then(res => {
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
  

  

  
}

export default new General();
