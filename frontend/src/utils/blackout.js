import axios from "axios";
// import Cookies from 'js-cookie';

class Blackout {
  constructor() {
    
  }


    testBlackout() {
        return axios.post('/api/testBlackout', {
          })
            .then(res => {
                  return res.data;
            })
            .catch(err => {
              console.log(err);
            })
    
    }

  
}
  

  


export default new Blackout();
