  
import React from "react";
import kchicken from "../StyleSheets/koreanchicken.jpg"
import Header from "../components/Header.js"
export const HomePage = props => {
    return (
        <div>
            <Header />
            <div>
               
                < div className="homeContainer" > 
                    <div> 
                        <div className="text">Do you want to get fucked</div>
                        <div className="textLARG"> Kaychiq is the solution for you!  </div>
                    </div>
                    <img className= "pic" src={kchicken} style={{"align-self":"center"}}/> 
                </div>
            </div>
        </div>
    )
}