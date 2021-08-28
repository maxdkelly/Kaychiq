
import React from "react";
import "../StyleSheets/Tag.css"
import {Close} from "grommet-icons";

const Tag = props => {
  return (
    <div className="tag-box">
        {props.taskName}
        <Close className="closeIcon" color="#f4eddb" size="small" onClick={props.handle}/>
    </div>
    
  );
};
 
export default Tag;