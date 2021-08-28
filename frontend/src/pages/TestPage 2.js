import React, { useState, Component, setState } from "react";
import Title from "../components/Header";
import NavbarAuthenticated from "../components/NavbarAuthenticated"
import "../StyleSheets/TaskViewPage.css"
import { Link } from 'react-router-dom';
import { Close, Edit } from "grommet-icons";
import task from "../utils/task";
import { Dropdown } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import user from "../utils/user";
import { StatusGoodSmall, Waypoint, Checkbox, CheckboxSelected } from "grommet-icons";
import Popup from "../components/Popup"
import Tag from "../components/Tag"
import Date from "../components/Date"

class TestPage extends React.Component {

    state = {
        taskName: "",
        taskDescription: "",
        taskTags: [],
        priority: "",
        startDate: "",
        endDate: "",
        timetable: [],
        error:"",
        task_id:this.props.location.task_id,
        contributors:[],
        users:[],
        userString:"",
        availableTags:[],
        isOpen:false,
        addedTag: "",
        searching: false
    };

    addTagToDB(e) {
        this.setState({ isOpen: !this.state.isOpen });
        this.togglePopup(e);
        var x = this.state.availableTags;
        x.push(this.state.addedTag);


        this.setState({availableTags: x });



        this.setState({addedTag: "" });
    }
    
     handleTaskChange(e) {
        this.setState({ addedTag: e });
    }
    
    

    togglePopup(e) {
        
        e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen });
    }   

    getTags(){
        task.getTags()
            .then(data => 
                setState({ availableTags: data.tags })
            );
         
    }
    
    isContributor(user_id, e){
        e.preventDefault();
        var newList = this.state.contributors;
        newList.forEach(item => {
            if(item.user_id === user_id){

                return null;
            }
        })
        return true;
    }

    addContributor = (user_id, user_name, e) => {
        var newList = this.state.contributors;
        var inList = true;
        
        newList.forEach(item => {
            if(item.user_id === user_id){

                inList = false;
            }
        })
       
       
        if(inList){
            console.log(newList);
            newList.push({user_id:user_id, name:user_name});
            this.setState({contributors:newList});
        }
    }

    componentDidMount() {
        
        if (this.state.task_id){
            task.getTask(this.state.task_id)
                .then(data => {
                    if (data.success===false){
                        this.setState({error:data.msg});
                    }
                    else{
                        this.setState({taskName:data.task.taskName});
                        this.setState({taskDescription:data.task.taskDescription});
                        this.setState({taskTags:data.task.taskTags});
                        this.setState({priority:data.task.priority});
                        var dateMomentStart = moment(data.task.startDate, "DD/MM/YYYY");
                        this.setState({startDate:dateMomentStart.toDate()});
                        var dateMomentEnd = moment(data.task.endDate, "DD/MM/YYYY");
                        this.setState({endDate:dateMomentEnd.toDate()});
                        this.setState({timetable:data.task.timetable});
                    }
                })
                .catch (err => { 
                    console.log(err); 
                });
            task.getContributors(this.state.task_id)
            .then(data => {
                if (data.success){
                    this.setState({contributors:data.contributors});
                }
                else{
                    this.setState({error:data.msg});
                }
            })
        }

        else{
            window.location.href="/calendar";
        }
    }
    addTag(tag) {

        if (this.state.taskTags.includes(tag)) {
            
        }
        else {
            let newTags = this.state.taskTags;
            newTags.push(tag);
            this.setState({  taskTags: newTags });
        }
    }
    

    getUsers = () => {
        user.searchUsers(this.state.userString)
            .then(data => {
                if (data.success){
                    var newList = [];
                    data.connectedUsers.map(connectedUser => {
                        var name = connectedUser.firstName + " " + connectedUser.lastName;
                        newList.push({user_id:connectedUser.id, name:name});
                    })
                    this.setState({users:newList});
                    console.log(newList);
                }
                else{
                    this.setState({error:data.msg});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    searchUsers = (userString) => {
        this.setState({searching:true});
        if(userString == "") {
            this.setState({ userString:userString }, () => this.getUsers());
        } else {
            this.setState({ userString:userString}, () => this.getUsers());
        }
    }

    submit = () => {
        task.updateTask(this.state.task_id, 
            {
                taskName: this.state.taskName,
                taskDescription: this.state.taskDescription,
                taskTags: this.state.taskTags,
                priority: this.state.priority,
                startDate: moment(this.state.startDate).format("DD/MM/YYYY"),
                endDate: moment(this.state.endDate).format("DD/MM/YYYY"),
                timetable: this.state.timetable
            }
        )
        .then(data => {
            console.log(data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    handleHourChange = (day_id, hours) => {
        const newList = this.state.timetable.map((day) => {
            if (day.date === day_id) {
              const updatedDay = {
                ...day,
                hours:hours,
              };
              return updatedDay;
            }
            return day;
         });
        this.setState({timetable:newList});
    }

    setContributor = (day_id, contributor_id, contributor_name) => {
        const newList = this.state.timetable.map((day) => {
            if (day.date === day_id) {
              const updatedDay = {
                ...day,
                contributor_id:contributor_id,
                contributor_name:contributor_name
              };
              return updatedDay;
            }
            return day;
         });
        this.setState({timetable:newList});
    }

   

    render(){
        if (!this.state.task_id){
            return (
                <div>
                <Title />
                <NavbarAuthenticated />
                <h3>Loading...</h3>
                </div>
            )
        }

        return (
            <div>
                <Title />
                <NavbarAuthenticated />
                



                <div className="homeContainer"> 
                    <div className="title"> Edit Task</div>
                        <div className="containerC">
                            <div className = "containerA">
                                <div className="input-format">
                                    <div ><b>Task Name:  </b></div> 
                                    <input className="input" placeholder="taskName" name="taskName" id="taskName" onChange={s => this.setState({taskName: s.target.value })} value={this.state.taskName} />
                                </div>
                                <div className="input-format">
                                    <div ><b>Start Date: </b>{this.state.startDate.toString().substring(0,15)}</div>

                                </div>
                                <div className="input-format">
                                    <div ><b>End Date: </b> {this.state.endDate.toString().substring(0,15)}</div>

                                </div>
                                <div className="input-format">
                                <div ><b>Description:  </b></div> <form>
                                <input className="input" placeholder="taskDescription" name="taskDescription" id="taskDescription" onChange={s => this.setState({taskDescription: s.target.value })} value={this.state.taskDescription} />
                                
                                </form>
                    </div>
                            </div>
                        
                        <div className="containerD"> 
                            <div className= "containerB"> 
                                <div className="priority"> <b>Priority:</b></div>
                                <Dropdown>
                                    <Dropdown.Toggle className="beige"  variant="success" id="dropdown-basic">
                                        {this.state.priority === "" ? "Priority" : this.state.priority}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.setState({priority: "Very Low" })}>Very Low</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({priority: "Low" })}>Low</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({priority: "Medium" })}>Medium</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({priority: "High" })}>High</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.setState({priority: "Critical" })}>Critical</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                        
                             </div>
                            
                        </div>
                            

                    </div>
                    

                    
                    

                    <div className="tagsBOX"> 
                                <div className="priority"><b>Tags:</b></div>
                                <Dropdown >
                                    <Dropdown.Toggle className={"beige"} variant="secondary btn-sm" id="dropdown-basic">
                                        Choose from Existing Tags:
                                    </Dropdown.Toggle>

                                    


                                    <Dropdown.Menu >
                                    {this.state.availableTags.map(tag => {
                                        return (
                                            <div>
                                                <Dropdown.Item  onSelect={(s) => this.addTag(s)}> 
                                                {tag}
                                                </Dropdown.Item>
                                            </div>
                                        )
                                    })
                                    }

                                        
                                        {/* <Dropdown.Item eventKey="tag 1" onSelect={s => addTag(s)}>Tag 1</Dropdown.Item>
                                <Dropdown.Item eventKey="tag 2" onSelect={s => addTag(s)}>Tag 2</Dropdown.Item> */}
                                </Dropdown.Menu>
                                   
                                </Dropdown>
                                <div className="priority">  or </div>
                                <button className="beige-button" 
                                
                                onClick={(s) => this.togglePopup(s)} > Create New Tag </button>
                                {this.state.isOpen && <Popup
                                    title={"Create a New Tag"}
                                    content={<>
                                         <div className="tagContainer">
                                            <div className="newTag" ><b>Name:</b>  
                                                <input  type="text" className="input"
                                                        value={this.state.addedTag}
                                                        onChange={(s) => this.handleTaskChange(s.target.value)}
                                                         >
                                                </input>
                                            </div>   
                                            
                                            <button className="beige-buttonb"
                                             onClick={(s) => this.addTagToDB(s)} > Save</button>
                                        </div>
                                        
                                    </>}
                                    
                                    handleClose={(s) => this.togglePopup()}
                                    />}
                    </div>
                    <div> 
                        
                       
                        {this.state.taskTags.map((tag) => {
                            return (
                                <Tag taskName={tag} handle={(e) => this.removeTag(e,tag)}> </Tag>
                                    ) 
                            })}
                    </div>
                
                    <div className="input-format">
                            <div ><b>Add Users:</b> <input className="input" key="searchUsers" value={this.state.userString} placeholder={"Search Users"} onChange={(s) => this.searchUsers(s.target.value)}/></div>
                            
                            

                           
                    </div>
                    <div>
                           

                                {
                                    this.state.users.map(user => {
                                        return (
                                            <div >
                                                <button  className="userContainer" onClick={(e) => this.addContributor(user.user_id, user.name, e)}>
                                                    
                                                    <div className="dateText">{user.name}</div>
                                               
                                                <CheckboxSelected className={"show"}></CheckboxSelected>
                                                
                                                <Checkbox className={"show"}> </Checkbox>
                                                </button>
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    <div >
                        <div><b>Dates:</b></div> 
                        
                        <div className="listDate"> {
                            this.state.timetable.map(day => {
                                return(
                                    <div className="listDate">
                                        <div className="dateContainer">
                                            <div className="dateText"><b>{day.date}</b></div>
                                            <div className="hours">
                                                <div className="dateText">Hours:</div> 
                                                <div>
                                                    <form> 
                                                    <div><input className="input"value={day.hours} onChange={s => this.handleHourChange(day.date, s.target.value)}/></div>
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="dateContainer">
                                                <div className="dateText">  User Assigned: </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle className="userDrop"variant="success" id="dropdown-basic">
                                                        {day.contributor_name}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        { this.state.contributors ? 
                                                        this.state.contributors.map(contributor => {
                                                            return (
                                                                <Dropdown.Item onClick={() => this.setContributor(day.date, contributor.user_id, contributor.name)}>{contributor.name}</Dropdown.Item>
                                                            )
                                                        })
                                                        : <Dropdown.Item/> }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>    
                                    </div>
                                )
                            })
                            
                        }</div>
                        
                    </div>
                    <Link className="link" to={{pathname:"/task", task_id:this.state.task_id}}>
                            <button className="centeredButton" onClick={this.submit}>Submit</button></Link>
                </div>

               
                
                                
            </div>


          
        )
    }
}

export default TestPage;