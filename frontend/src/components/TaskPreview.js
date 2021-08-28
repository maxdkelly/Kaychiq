import { useState, React } from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/TaskPreview.css";

export const TaskPreview = (props) =>{

    const tags = "";

    // if(props.taskTags){
    //     const tags = props.taskTags.map((tag) =>
    //     <li>{tag}</li>
    // );
    //}

    return (
        <Link className="link" to={{pathname:"/task", task_id:props.taskID, user_id:props.user_id}}>
        <div className="taskContainer"> 
       
            <div className="container1">
            
                <div className="taskTitle">{props.taskName}</div>
            
                <div className="container2"> 
                    <div >TaskID: {props.taskID}</div>
                    <div className="container4"> 
                    <div>Task Priority:  </div> 
                    <div className={props.priority}>{props.priority}</div> 
                    </div>
                </div>
            </div>
            
            <div className="container3">
            
                <div className="date"> Start Date: {props.startDate}</div> 
                <div className="date"> End Date: {props.endDate}</div> 
                <div className="tags"> {props.taskTags.map((tag) => {
                    return <text className= "tag">{tag}</text>
                })}</div>
            </div>
            
        </div>
        </Link>
        
    )
}

 export default TaskPreview;