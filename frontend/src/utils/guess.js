import axios from "axios";
// import Cookies from 'js-cookie';

class Guess {
  constructor() {
    
  }


    getGuessState(token) {
        return axios.post('/api/getGuessState', {
            token: token
          })
            .then(res => {
                  return res.data;
            })
            .catch(err => {
              console.log(err);
            })
    
    }

    guess(token, guess) {
        return axios.post('/api/guess', {
            token: token,
            guess: guess
          })
            .then(res => {
                  return res.data;
            })
            .catch(err => {
              console.log(err);
            })
    
    }

    guessToLobby(token) {
      return axios.post('/api/guessToLobby', {
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

export default new Guess();
