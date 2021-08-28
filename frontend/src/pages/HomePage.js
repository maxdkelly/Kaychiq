import React from "react";
import Header from "../components/Header.js"
import { Link } from "react-router-dom";
import NavbarUnauthenticated from "../components/NavbarUnauthenticated.js";
import teamwork from "../StyleSheets/teamwork.jpg"


export const HomePage = props => {
    return (
        <div>
            <Header />
            <div>
                <NavbarUnauthenticated/>
                < div className="homeContainer" > 
                    <div> 
                        <div className="text">Do you find tasks difficult to keep track of? Do you find it difficult to collaborate accross teams?</div>
                        <div className="textLARG"> Task Master is the solution for you!  </div>
                    </div>
                    <img className= "pic" src={teamwork} style={{"align-self":"center"}}/> 
                </div>
            </div>
        </div>
    )
}