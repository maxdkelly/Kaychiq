import React, { useState, useEffect } from "react"
import { Dropdown } from "react-bootstrap";
import NavbarAuthenticated from "../components/NavbarAuthenticated";
import Title from "../components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import task from "../utils/task";
import Moment from "moment";
import { StatusGoodSmall, Waypoint } from "grommet-icons";
import "../StyleSheets/AddTask.css"
import { Redirect } from "react-router";
import Popup from "../components/Popup"
import Tag from "../components/Tag"

const AddTaskPage = () => {
    const [taskContents, setTask] = useState({
        taskName: "",
        taskDescription: "",
        taskTags: [],
        availableTags: [],
        priority: "",
        priorityColour:"beige",
        startDate: "",
        endDate: "",
        addedTag: "",
        task_id: ""
    });

    useEffect(() => {
        task.getTags().then(data => setTask({ ...taskContents, availableTags: data.tags }));
     }, []);

    const [isOpen, setIsOpen] = useState(false);
 
    const [complete, setComplete] = useState(false);

    

    

    function togglePopup(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }   

    const [validationError, setValidationError] = useState("");
    const [tempStartDate, setTempStartDate] = useState();
    const [tempEndDate, setTempEndDate] = useState();
    const [hoursPerDay, setHours] = useState();

    const [errors ,setErrors] = useState(
        {
        taskName: false, 
        startDate: false, 
        endDate: false,
        description: false,
        priority: false, 
        hours: false
        }
    )
    const submit = s => {
        var timetable = [];
        var currentDate = Moment(tempStartDate);
        var stopDate = Moment(tempEndDate);
        var id = 0
        while (currentDate <= stopDate) {
            timetable.push({
                date:Moment(currentDate).format('DD/MM/YYYY'),
                hours:parseInt(hoursPerDay)
            });
            currentDate = Moment(currentDate).add(1, 'days');
        }
        if (validate(s)) {
            task.addTask(
                {
                    taskName:taskContents.taskName,
                    taskDescription:taskContents.taskDescription,
                    taskTags:taskContents.taskTags,
                    priority:taskContents.priority,
                    startDate:Moment(tempStartDate).format('DD/MM/YYYY'),
                    endDate:Moment(tempEndDate).format('DD/MM/YYYY'),
                    timetable:timetable
                }
            ).then(data => {
                if (data.success === true){
                    setTask({...taskContents, task_id:data.taskID});
                    setComplete(true);
                }
                else{
                    setValidationError(data.msg);
                }
            }).catch(err =>{
                console.log(err);
            })
        } 

        console.log("taskName has errors:"  + errors.taskName)
    }


    function addTag(tag) {

        if (taskContents.taskTags.includes(tag)) {
            setValidationError("Already added this tag");
        }
        else {
            let newTags = taskContents.taskTags;
            newTags.push(tag);
            setTask({ ...taskContents, taskTags: newTags });
        }
    }

    function addTagToDB(e) {
        e.preventDefault();
        togglePopup(e);
        console.log(taskContents.addedTag);

        setTask({ ...taskContents, availableTags: taskContents.availableTags.push(taskContents.addedTag) });

        console.log(taskContents.availableTags);

        setTask({ ...taskContents, addedTag: "" });
    }

    function handleTaskChange(e) {
        setTask({ ...taskContents, addedTag: e.target.value });
    }

    function removeTag(e,id){
        e.preventDefault();
        
        const newList = taskContents.taskTags.filter((tag) => tag !== id);
        setTask({...taskContents, taskTags:newList});
    }

    const validate = s => {
        s.preventDefault();
        var taskName=false;
            var startDate=false;
            var endDate=false;
            var description=false;
            var priority=false;
            var hours=false;

        if (taskContents.taskName === "" || taskContents.taskDescription === "" || taskContents.priority === ""|| taskContents.tempStartDate === "" || taskContents.tempEndDate === "" || taskContents.hoursPerDay === "" ){
            setValidationError("Error: All fields must be filled!");

            

            if(taskContents.taskName === ""){
                taskName=true;
            } else {
                taskName=false;
            }

            if (taskContents.taskDescription === ""){
                description=true;
            } else {
                description=false;
            }

            if (taskContents.priority === ""){
                priority=true;
            }  else {
                priority = false;
            }

           

            if (!hoursPerDay ){
                hours=true;
            } else {
                hours=false;
            }
            
            setErrors({
                taskName: taskName, 
                startDate: startDate, 
                endDate: endDate,
                description: description,
                priority: priority, 
                hours: hours
                })
            
            return false;
        }
        
        if (hoursPerDay <= 0){
            setValidationError("Error: You need some hours per day for this task");
            setErrors({hours: true})
            return false;
        }
         if (tempStartDate > tempEndDate) {
            setValidationError("Error: Start date needs to be before end date!");
            setErrors({startDate: true, endDate: true})
            return false;
        }
        return true;
    }

   


    return (
        <div>
            {complete ? <Redirect to={{pathname:"edit_task", task_id:taskContents.task_id, created:true}}/> : <div/>}
            <Title />
            <NavbarAuthenticated />
            

            <div className="homeContainer"> 
                <div className="title"> Create a New Task</div>
                    <form>

                <div className="containerC">
                    <div className = "containerA">
                        <div className="input-format">
                            <div ><b>Task Name:</b></div>
                             <input className={errors.taskName ? "errorInput":"input"} placeholder="taskName" name="taskName" id="taskName" onChange={s => setTask({ ...taskContents, taskName: s.target.value })} value={taskContents.taskName} />
                             
                        </div>
                        <div className={errors.taskName ? "errorMsg":"hidden"}  >{validationError}</div>
                        
                        <div className="input-format">
                            <div > <b>Start Date: </b> </div>
                            <DatePicker placeholderText="Click to select a date" className= {errors.startDate ? "errorInput":"input"}  placeholder="01/01/2000" dateFormat="dd/MM/yyyy" selected={tempStartDate} onLoad={s => setTempStartDate(s)} onChange={s => setTempStartDate(s)} />
                        </div>
                        <div className={errors.startDate ? "errorMsg":"hidden"}  >{validationError}</div>
                         
                        <div className="input-format">
                            <div  ><b> End Date: </b></div>
                            <DatePicker placeholderText="Click to select a date" className={errors.endDate ? "errorInput":"input"} placeholder="01/01/2000" dateFormat="dd/MM/yyyy" selected={tempEndDate} onLoad={s => setTempStartDate(s)} onChange={s => setTempEndDate(s)} />
                        </div>
                        <div className={errors.endDate ? "errorMsg":"hidden"}  >{validationError}</div>
                    
                    </div>
                    <div className="containerD"> 
                        <div className= "containerB"> 
                            <div className="priority"> <b>Priority:</b></div>
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle  className={errors.priority ? "errorInput": taskContents.priorityColour} variant="secondary btn-sm"id="dropdown-basic">
                                    {taskContents.priority === "" ? "Choose" : taskContents.priority}
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item onClick={s => setTask({ ...taskContents, priority: "Very Low", priorityColour: "darkgreen"  })}  > <StatusGoodSmall color="darkgreen"/>Very Low</Dropdown.Item>
                                    <Dropdown.Item onClick={s => setTask({ ...taskContents, priority: "Low", priorityColour: "green" })}><StatusGoodSmall color="green"/>Low</Dropdown.Item>
                                    <Dropdown.Item onClick={s => setTask({ ...taskContents, priority: "Medium", priorityColour: "orange" })}><StatusGoodSmall color="orange"/>Medium</Dropdown.Item>
                                    <Dropdown.Item onClick={s => setTask({ ...taskContents, priority: "High", priorityColour: "red" })}> <StatusGoodSmall color="red"/>High</Dropdown.Item>
                                    <Dropdown.Item onClick={s => setTask({ ...taskContents, priority: "Critical", priorityColour: "black" })}><StatusGoodSmall color="black"/>Critical</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        
                        </div>
                        <div className={errors.priority ? "errorMsg":"hidden"}  >{validationError}</div>

                        <div className="containerB">
                            <div> <b>Hours: </b> </div>
                            <input className= {errors.hours ? "errorInput":  "hoursInput"} placeholder="hours" name="hoursPerDay" id="hoursPerDay" onChange={s => setHours(s.target.value)} value={hoursPerDay} />
                        </div>
                        <div className={errors.hours ? "errorMsg":"hidden"}  >{validationError}</div>

                    </div>

                </div>
                        <div className="des-box">
                            <div><b> Description:</b></div>
                             <textarea className={errors.description ? "error-des" :"input-des"} type="taskDescription" placeholder="taskDescription" name="taskDescription" id="taskDescription" onChange={s => setTask({ ...taskContents, taskDescription: s.target.value })} value={taskContents.taskDescription} />
                        </div >
                        <div className={errors.description ? "errorMsg":"hidden"}  >{validationError}</div>


                        <div>

                            <div className="tagsBOX"> 
                                <div className="priority"><b>Tags:</b></div>
                                <Dropdown >
                                    <Dropdown.Toggle className={"beige"} variant="secondary btn-sm" id="dropdown-basic">
                                        Choose from Existing Tags:
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >

                                        {taskContents.availableTags.map((tag) => {
                                            return (
                                                <Dropdown.Item eventKey={tag} onSelect={s => addTag(s)}>{tag}</Dropdown.Item>   
                                            )
                                        })}
                                        {/* <Dropdown.Item eventKey="tag 1" onSelect={s => addTag(s)}>Tag 1</Dropdown.Item>
                                <Dropdown.Item eventKey="tag 2" onSelect={s => addTag(s)}>Tag 2</Dropdown.Item> */}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className="priority">  or </div>
                                <button className="beige-button" onClick={(e) => togglePopup(e)} > Create New Tag </button>
                                {isOpen && <Popup
                                    title={"Create a New Tag"}
                                    content={<>
                                         <div className="tagContainer">
                                            <div className="newTag" ><b>Name:</b>  
                                                <input  type="text" className="input"
                                                        value={taskContents.addedTag}
                                                        onChange={(e) => handleTaskChange(e)} >
                                                </input>
                                            </div>   
                                            
                                            <button className="beige-buttonb" onClick={ e => addTagToDB(e) }> Save</button>
                                        </div>
                                        
                                    </>}
                                    handleClose={(e) => togglePopup(e)}
                                    />}
                                
                            </div>
                            <div> 
                                    
                                {taskContents.taskTags.map((tag) => {
                                return (
                                    <Tag taskName={tag} handle={(e) => removeTag(e,tag)}> </Tag>
                                    ) 
                                })}
                            </div>
                        </div>
                   

                  
                       
                   
                        

                        
                        
                     </form>
                     <button className="button" onClick={submit}> Submit </button>

            </div>

           
        </div>
    )
}

export default AddTaskPage;