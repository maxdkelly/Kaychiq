import React, { useEffect, useState, useRef } from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';

export const LobbyView = props => {
  
    const [players, setPlayers] = useState([]);
    const [token, setToken] = useState(props.token)



    useEffect(() => {

        if (props.token !== token) {
            setToken(props.token);        
        }
    });



    useInterval(() => {
        setLobby()
    }, 2000);   
  
    const setLobby = () => {
        console.log(token)
        general.checkGameStarted(token)
            .then(data => {
               setPlayers(data.players)
            })
    };

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    return (
        <div>
            <div className="textLARG"> Lobby:
            
            {
                players.map((player) => {
                    return <div className="textSMOL"> {player} </div>
                })
            }
            </div>


            
        </div>
        
    );

}
  

export default LobbyView
