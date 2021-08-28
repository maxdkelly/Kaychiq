import React, { Component, useState, setState } from "react";
import Task from "../utils/task"
import NavbarAuthenticated from "../components/NavbarAuthenticated";
import Title from "../components/Header";
import "../StyleSheets/CalendarViewPage.css";
import TaskPreview from "../components/TaskPreview.js";
import TaskViewPage from "./TaskViewPage";
import Moment from "moment";
import { Link } from "react-router-dom";
import { AddCircle } from "grommet-icons";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import user from "../utils/user";

import { Dropdown } from "react-bootstrap";
//TODO
// set dates
class CalendarViewPage extends React.Component {

    state = {
        startDate: Moment(new Date()).format("DD/MM/YYYY"),
        endDate: Moment(new Date()).add(27, "days").format("DD/MM/YYYY"),
        startDateObj: Moment(new Date()).toDate(),
        endDateObj: Moment(new Date()).add(27, "days").toDate(),
        tasks: [],
        error: "",
        sorted: "taskName",
        searchTerm: "",
        searchTermTag: "",
        noItemsString: "No Tasks found",
        viewBox: false,
        user: {},
        savedEndDate: null,
        savedStartDate: null,
        savedEndDateObj: null,
        savedStartDateObj: null,
        user_id: 0,
        sortMethod: ""
    }


    componentDidMount() {
        var user_id = 0;
        if (this.props.location.user_id) {
            user_id = this.props.location.user_id;
        }
        user.getUserProfile(user_id)
            .then(data => {
                if (data.success) {
                    this.setState({ user: data.profile })
                }
                else {
                    this.setState({ error: data.msg });
                }
            })
            .catch(err => {
                this.setState({ error: err });
            })

        this.setState({ user_id: user_id });
        this.handleSort = this.handleSort.bind(this);
        this.handleSearchName = this.handleSearchName.bind(this);
        this.handleSearchTag = this.handleSearchTag.bind(this);
        this.getSortedTimetable(user_id);

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);

        this.handleCheckbox = this.handleCheckbox.bind(this);


        this.handleStartDate = this.handleStartDate.bind(this);

        console.log(this.state.startDate)
    }

   
    getTimetable = (user_id) => {
        Task.getTimetable(user_id, this.state.startDate, this.state.endDate)
            .then(data => {
                if (data.success === true) {
                    this.setState({ tasks: data.tasks });
                }
                else {
                    this.setState({ error: data.msg });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    getSortedTimetable = (user_id) => {
        Task.getSortedTimetable(user_id, this.state.startDate, this.state.endDate, this.state.sorted)
            .then(data => {
                if (data.success === true) {
                    this.setState({ tasks: data.tasks });
                }
                else {
                    this.setState({ error: data.msg });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    getSearchedTaskName = () => {



        Task.searchTaskName(this.state.user_id, this.state.searchTerm, this.state.startDate, this.state.endDate)
            .then(data => {
                if (data.success === true) {
                    this.setState({ tasks: data.tasks });
                }
                else {
                    this.setState({ error: data.msg });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    getSearchedTaskTag = () => {


        Task.searchTaskTag(this.state.user_id, this.state.searchTermTag, this.state.startDate, this.state.endDate)
            .then(data => {

                console.log(data)
                if (data.success === true) {
                    this.setState({ tasks: data.tasks });
                }
                else {
                    this.setState({ error: data.msg });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    handleSearchName(e) {

        if (e.target.value == "") {
            this.setState({ searchTerm: e.target.value }, () => this.getSortedTimetable(this.state.user_id));
        } else {

            this.setState({ noItemsString: "No Tasks Found" })
            this.setState({ searchTerm: e.target.value }, () => this.getSearchedTaskName());
        }


        console.log(e.target.value)
    }

    handleSearchTag(e) {

        if (e.target.value == "") {
            this.setState({ searchTermTag: e.target.value }, () => this.getSortedTimetable(this.state.user_id));
        } else {
            this.setState({ noItemsString: "No Tasks Found" })

            this.setState({ searchTermTag: e.target.value }, () => this.getSearchedTaskTag());
        }


    }



    handleSort(e, sort) {
        var tag = e;
        var s = sort;
        console.log(e.target.value)
        this.setState({ sorted: sort }, () => this.getSortedTimetable(this.state.user_id));

        // this.setState(prevState => ({
        //   isToggleOn: !prevState.isToggleOn
        // }));
    }

    handleStartDate() {


        let d = this.state.startDateObj;

        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1; //Months are zero based
        let curr_year = d.getFullYear();
        let dateStr = curr_date + "/" + curr_month + "/" + curr_year;

        this.setState({ startDate: dateStr }, () => this.getSortedTimetable(this.state.user_id));
    }

    setStartDate(e) {
        this.setState({ startDateObj: e, viewBox: false }, () => this.handleStartDate())
    }

    handleEndDate() {

        let d = this.state.endDateObj;

        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1; //Months are zero based
        let curr_year = d.getFullYear();
        let dateStr = curr_date + "/" + curr_month + "/" + curr_year;

        this.setState({ endDate: dateStr }, () => this.getSortedTimetable(this.state.user_id));
    }

    setEndDate(e) {
        this.setState({ endDateObj: e, viewBox: false }, () => this.handleEndDate())
    }

    setCheckbox() {

        if (this.state.viewBox) {
            this.setState({
                savedEndDate: this.state.endDate,
                savedStartDate: this.state.startDate,
                savedEndDateObj: this.state.endDateObj,
                savedStartDateObj: this.state.startDateObj,
                endDate: null,
                startDate: null,
                endDateObj: null,
                startDateObj: null
            }, () => this.getSortedTimetable(this.state.user_id))
        } else {
            this.setState({
                endDate: this.state.savedEndDate,
                startDate: this.state.savedStartDate,
                endDateObj: this.state.savedEndDateObj,
                startDateObj: this.state.savedStartDateObj,
            }, () => this.getSortedTimetable(this.state.user_id))

        }
    }

    handleCheckbox(e) {

        this.setState({ viewBox: !this.state.viewBox }, () => this.setCheckbox());
    }

    changeSortMethod(e, method){
        e.preventDefault();
        this.setState({ sortMethod: method });
        var method = this.state.sortMethod;
    }

    render(){



            if (this.state.tasks.length === 0) {
                return (
                    <div>
                        <Title />
                        <NavbarAuthenticated />
                        

                        <div className="tasksBox">
                        <div className="title">{this.state.user.firstName} {this.state.user.lastName}'s Task View</div>
                        <div >
                            <div className="headerContainer">

                               

                                
                                <div className="input-format">
                                    <div > Start Date: </div>
                                    <DatePicker className="input"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Click to select a date"
                                        selected={this.state.startDateObj}
                                        onChange={(date) => this.setStartDate(date)}
                                    />
                                </div>

                                <div className="input-format">
                                    <div > End Date:  </div>
                                    <DatePicker
                                        className="input"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Click to select a date"
                                        selected={this.state.endDateObj}
                                        onChange={(date) => this.setEndDate(date)}
                                    />
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={this.state.viewBox} onChange={(e) => this.handleCheckbox(e)}/>
                                    <label class="form-check-label" for="flexCheckChecked">
                                        View all tasks
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="headerContainer">
                            <div className="searchContainer">
                                <div>Search: </div>
                                <input className={(this.state.sortMethod === "search task name") ? "input" : "hidden"}
                                    key="random1"
                                    value={this.state.searchTerm}
                                    placeholder={"search task name"}
                                    onChange={(e) => this.handleSearchName(e)}
                                />

                                <input className={(this.state.sortMethod === "search task name") ? "hidden" : "input"}
                                    key="random2"
                                    value={this.state.searchTermTag}
                                    placeholder={"search task tag"}
                                    onChange={(e) => this.handleSearchTag(e)}
                                />


                                <Dropdown>
                                    <Dropdown.Toggle className={"beige"} variant="secondary btn-sm" id="dropdown-basic">
                                        Search By:
                                </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => this.changeSortMethod(e, "search task name")} >Task Name</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => this.changeSortMethod(e, "search tag name")} >Tag</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>



                            <label>

                                <Dropdown>
                                    <Dropdown.Toggle className={"beige"} variant="secondary btn-sm" id="dropdown-basic">
                                        Sort By:
                                </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => this.handleSort(e, "taskName")} value="taskName">Title</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => this.handleSort(e, "priority")} value="priority">Priority</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => this.handleSort(e, "startDate")} value="startDate"  >Start Date</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </label>

                        

                                {
                                    this.state.user_id === 0
                                        ?
                                        <Link to="/add_task" className="link">Click here to create a task</Link>
                                        :
                                        <div />
                                }
                            </div>
                            <div className={ "noResults1"}> No tasks found </div>
                            <Link className={(this.props.location.user_id===1) ? "buttonC": "hidden"} to="/add_task">
                                  <b>Create a new task</b>
                            </Link>
                        </div>
                    </div>
                )
            }



            return (
                <div >
                    <Title />
                    <NavbarAuthenticated />
                    
                    
                    <div className="tasksBox">
                    <div className="title">{this.state.user.firstName} {this.state.user.lastName}'s Task View</div>
                        <div >
                            <div className="headerContainer">

                               

                                
                                <div className="input-format">
                                    <div > Start Date: </div>
                                    <DatePicker className="input"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Click to select a date"
                                        selected={this.state.startDateObj}
                                        onChange={(date) => this.setStartDate(date)}
                                    />
                                </div>

                                <div className="input-format">
                                    <div > End Date:  </div>
                                    <DatePicker
                                        className="input"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Click to select a date"
                                        selected={this.state.endDateObj}
                                        onChange={(date) => this.setEndDate(date)}
                                    />
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={this.state.viewBox} onChange={(e) => this.handleCheckbox(e)}/>
                                    <label class="form-check-label" for="flexCheckChecked">
                                        View all tasks
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="headerContainer">
                            <div className="searchContainer">
                                <div>Search: </div>
                                <input className={(this.state.sortMethod === "search task name") ? "input" : "hidden"}
                                    key="random1"
                                    value={this.state.searchTerm}
                                    placeholder={"search task name"}
                                    onChange={(e) => this.handleSearchName(e)}
                                />

                                <input className={(this.state.sortMethod === "search task name") ? "hidden" : "input"}
                                    key="random2"
                                    value={this.state.searchTermTag}
                                    placeholder={"search task tag"}
                                    onChange={(e) => this.handleSearchTag(e)}
                                />


                                <Dropdown>
                                    <Dropdown.Toggle className={"beige"} variant="secondary btn-sm" id="dropdown-basic">
                                        Search By:
                                </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => this.changeSortMethod(e, "search task name")} >Task Name</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => this.changeSortMethod(e, "search tag name")} >Tag</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>



                            <label>

                                <Dropdown>
                                    <Dropdown.Toggle className={"beige"} variant="secondary btn-sm" id="dropdown-basic">
                                        Sort By:
                                </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={(e) => this.handleSort(e, "taskName")} value="taskName">Title</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => this.handleSort(e, "priority")} value="priority">Priority</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => this.handleSort(e, "startDate")} value="startDate"  >Start Date</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </label>

                        </div>
                        

                        {
                            this.state.tasks.map((task) => {
                                return <TaskPreview taskName={task.taskName} taskID={task.taskID} taskTags={task.taskTags} priority={task.priority} startDate={task.startDate} endDate={task.endDate} user_id={this.state.user_id}> hi</TaskPreview>
                            })
                        }
                    </div>
                </div>
            )
        }
    }

    export default CalendarViewPage;