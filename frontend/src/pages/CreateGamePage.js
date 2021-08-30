import React, { useState } from "react";
import { Redirect } from "react-router";

import Header from "../components/Header"
import CreateGameForm from "../components/CreateGameForm";
import LobbyView from "../components/LobbyView";

export const CreateGamePage = props =>{
  
    const [token, setToken] = useState("");

    const handleToken = token => {
        console.log(token);
        setToken(token);
    }

    return(
        <body>
            <Header/> 
            < div className="homeContainer" > 
                <CreateGameForm passToken={handleToken}/>
            </div>

            < div className="homeContainer" > 
                <LobbyView token={token}/>
            </div>
        </body>
    )
          
}
