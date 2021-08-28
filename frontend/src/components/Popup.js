
import React from "react";
import "../StyleSheets/PopUp.css"
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <div className="close-icon" onClick={props.handleClose}>x</div>
        <div className="box-title"> <b>{props.title}</b> </div>
        <div>{props.content}</div>
      </div>
    </div>
  );
};
 
export default Popup;