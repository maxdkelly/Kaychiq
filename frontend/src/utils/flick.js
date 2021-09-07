import axios from "axios";
// import Cookies from 'js-cookie';

class Flick {
  constructor() {
    
  }


    getFlickState(token) {
        return axios.post('/api/getFlickState', {
            token: token
          })
            .then(res => {
                  return res.data;
            })
            .catch(err => {
              console.log(err);
            })
    
    }

    flick(token, flick) {
        console.log(token)
        return axios.post('/api/flick', {
            token: token,
            flick : flick
          })
            .then(res => {
                  return res.data;
            })
            .catch(err => {
              console.log(err);
            })
    
    }

    flickToLobby(token) {
        console.log(token)
        return axios.post('/api/flickToLobby', {
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
  

  


export default new Flick();
