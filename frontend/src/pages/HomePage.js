  
import React from "react";
import kchicken from "../StyleSheets/koreanchicken.jpg"
import Header from "../components/Header.js"
import home from "../StyleSheets/HomePage.css"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export const HomePage = props => {
    return (
        <div>
            <Header />
            <div>
               
                < div className="homeContainer" > 
                    <div> 
                        <div className="text">Do you want to get fucked</div>
                        <div className="textLARG"> Kaychiq is the solution for you!  </div>

                        <Link to="/createGame" className="userContainer">
                            <div className="textLARG">Create Game </div>                                                         
                        </Link>
                        <Link to="/lobby" className="userContainer">
                            <div className="textLARG">Join Lobby </div>       
                        </Link>
                       
                    </div>
                    
                  

                    <img className= "pic" src={kchicken} style={{"align-self":"center"}}/> 
                </div>
            </div>
        </div>
    )
}