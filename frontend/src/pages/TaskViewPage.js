import React, { useState, Component } from "react";
import Title from "../components/Header";
import NavbarAuthenticated from "../components/NavbarAuthenticated"
import "../StyleSheets/TaskViewPage.css"
import { Link } from 'react-router-dom';
import { Close, Edit, Trash } from "grommet-icons";
import task from "../utils/task";
import Popup from "../components/Popup"
class TaskViewPage extends React.Component {

    state = {
        user_id:this.props.location.user_id,
        hover: false,
        taskName: "Loading...",
        taskDescription: "",
        taskTags: [],
        priority: "",
        startDate: "",
        endDate: "",
        timetable: [],
        error:"",
        owner_id:"",
        owner_name:"",
        task_id:this.props.location.task_id,
        isOpen:false,
        isEditable: false
    };

    togglePopup(e) {
        e.preventDefault();
        this.setState({isOpen: !this.state.isOpen});
    }   

    componentDidMount() {

        if (this.state.task_id){
            console.log(this.state.user_id)
            task.getTask(this.state.task_id, this.state.user_id)
                .then(data => {
                    console.log(data);
                    if (data.success===false){
                        this.setState({error:data.msg});
                    }
                    else{
                        this.setState({taskName:data.task.taskName});
                        this.setState({taskDescription:data.task.taskDescription});
                        this.setState({taskTags:data.task.taskTags});
                        this.setState({priority:data.task.priority});
                        this.setState({startDate:data.task.startDate});
                        this.setState({endDate:data.task.endDate});
                        this.setState({isEditable: data.task.isEditable});
                        this.setState({timetable:data.task.timetable});
                        this.setState({owner_id:data.task.owner.user_id});
                        this.setState({owner_name:data.task.owner.name});
                        
                    }
                })
                .catch (err => { 
                    console.log(err); 
                });
        }
    }

    deleteTask = () => {
        task.deleteTask(this.props.location.task_id)
        .then(data => {
            if (data.success === false){
                this.setState({taskName:data.msg});
            }
            else{
                document.location="/calendar";
            }
        })
    }

  
    render() {
        return (
            <div >
                {this.state.isOpen && <Popup
                    title={"Delete Task"}
                    content={<>
                        <div className="tagContainer">
                            <div className="newTag" ><b>Are you sure you want to delete?</b>  
                                
                            </div>  
                            <div className="newTag">  Once a task is deleted, it cannot be undone</div> 
                            <div></div>
                            <button className="beige-buttonb" onClick={ this.deleteTask}> Delete</button>
                        </div>
                                        
                    </>}
                    handleClose={(e) => this.togglePopup(e)}
                />}
                <Title />
                <NavbarAuthenticated />
                <div className="homeContainer">


                    <div className="container1">
                        <div className="title">
                            <div>Task: {this.state.taskName}</div>
                            
                        </div>
                        <div className="iconContainer">
                            <Link className="link" to={{pathname:"/edit_task", task_id:this.state.task_id, user_id:this.state.user_id}}>
                                <Edit className={this.state.isEditable ? "icon" : "hidden" }/>
                            </Link><Trash onClick={(e) => this.togglePopup(e)} className={"icon"} />
                            <Link className="link" to="/calendar">
                                <Close className={"icon"} />
                            </Link>
                           
                                
                            
                        </div>

                    </div>

                    <div>
                        <div className="textBlock">
                        <div><b>Task Owner:</b> <Link  className="link" to={{pathname:"/view_user", user_id:this.state.owner_id}}>{this.state.owner_name}</Link></div>
                            <div>
                                <b>Start Date:</b> {this.state.startDate}
                            </div>
                            <div>
                                <b>End Date:</b> {this.state.endDate}
                            </div>
                        </div>
                        <div className="priority">
                            <div> <b>Priority: </b> </div>
                            <div className={this.state.priority}>
                                {this.state.priority}
                            </div>
                        </div>
                    </div>
                    <div className="textBlock">
                        <div ><b>Description:</b>{this.state.taskDescription}</div>
                        
                    </div>

                    
                    <div style={{ fontWeight: "bold" }}>Tags:</div>
                    <div className="tags2"> {this.state.taskTags.map((tag) => {
                        return <text className="tag2">{tag}</text>
                    })}</div>

                    <div className="textBlock">
                        <b> Users:</b>
                       
                    </div> 


                        <div className="textBlock">
                            <b>Hours per Day:</b> 
                            
                        
                            {this.state.timetable.map((day) => {
                                    return (
                                        <div className="listDate">
                                            <div className="dateContainerSmall">
                                                <div><b>{day.date}</b></div>
                                                <div className="hours">
                                                    <div className="dateText"><b>Hours: </b>{day.hours}</div> 
                                                    <div className="dateText"> </div>
                                                    
                                                </div>
                                                <div className="hours">
                                                    <div className="dateText">  <b>User Assigned:</b> </div>
                                                    <Link to={{pathname:"/view_user", user_id:day.contributor_id}} className="link" ><div className="tag2">  {day.contributor_name} </div></Link>
                                                </div>
                                            </div>

                                            <div className="dateContainer">
                                            
                                            </div>
                                        
                                        </div>    
                                    );
                                    })}
                                    
                                    
                            </div>

                            
                </div>
            </div>
        )
    }
}

export default TaskViewPage;