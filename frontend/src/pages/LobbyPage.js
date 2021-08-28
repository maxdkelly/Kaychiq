import React from "react";
import { Redirect } from "react-router";

import Header from "../components/Header"

class LobbyPage extends React.Component{

    state = {
        authenticated:false
    };

    componentDidMount(){
       
    }

 

    render(){
      
        return(
            <body>
                <Header> </Header>
                <div className="textLARG"> Lobby Page</div>
            </body>
        )
        
    }
}

export default LobbyPage;