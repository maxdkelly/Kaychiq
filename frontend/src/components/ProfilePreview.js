import { useState, React } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/ProfileSearch.css"
export const ProfilePreview = (props) =>{

   

    return (
        <Link className="link" to={{ pathname: "/view_user", user_id:props.userID }} >
        
       
            <div className="userPreview">    
                <div className="userTitle">{props.userName}</div>
            </div>
            
        
        
        </Link>        
    )
}

 export default ProfilePreview;