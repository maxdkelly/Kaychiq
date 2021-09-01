import React, { useState, useEffect }  from "react";
import { Redirect } from "react-router";

import Header from "../components/Header"
import JoinGameForm from "../components/JoinGameForm";
import LobbyView from "../components/LobbyView";

export const LobbyPage = props => {

    const [token, setToken] = useState("");

    useEffect(() => {

        if(props.location.token) {
            setToken(props.location.token);
        }
      }, []);

    const handleToken = token => {
        console.log(token);
        setToken(token);
    }
  
    return(
        <body>
            <Header> </Header>
            < div className="homeContainer" > 
                <JoinGameForm passToken={handleToken} token={token}/>
            </div>

            <div className="homeContainer" > 
                <LobbyView token={token}/>
            </div>

        </body>
    )
          
}
