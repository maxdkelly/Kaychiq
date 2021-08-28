import React, { useState, Component, setState } from "react";
import "../StyleSheets/ProfilePage.css"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import task from "../utils/task";
import { MDBContainer } from "mdbreact";
import {Pie} from "react-chartjs-2";
import moment from "moment";
import "../StyleSheets/Dashboard.css"
// requires 'heuristicDate' to be passed in as a prop

class HeuristicDaily extends React.Component {

    state = {
        heuristicDate:this.props.heuristicDate,
        tasks:[],
        msg:"",
        totalHours:0,
        overloaded:false,
        loadPercentage:null,
        success:false,
        pieChartData: null,
        maxHours:8
    }

    componentWillReceiveProps(props) {
        console.log(props)
        var user_id = 0;
        if (props.user_id) {
            user_id = props.user_id;
        }

        task.getMaxHours()
        .then(data => {
            if (data.success){
                this.setState({maxHours:data.maxHours});
            }
            this.setState({msg:data.msg});
        })


        task.getTimetable(user_id, this.state.heuristicDate, this.state.heuristicDate)
        .then(data => {
            console.log(data);
            if (data.success){

                this.setState({tasks:data.tasks});
                this.setState({success:true});
                this.setChart(data.tasks);

                console.log(user_id);
                task.getMaxHoursUID(user_id)
                .then(data1 => {
                   
                    console.log(data1);
                    if (data1.success){
                    this.setState({maxHours:data1.maxHours},() =>  this.calculateTime());
                    }
                    this.setState({msg:data.msg});
                })
            }
            this.setState({msg:data.msg});
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    componentDidMount(){
        var user_id = 0;

        if (this.props.user_id) {
            user_id = this.props.user_id;
        }

        console.log(user_id);

        task.getMaxHours()
        .then(data => {
            if(data) {
                if (data.success){
                    this.setState({maxHours:data.maxHours});
                }
                this.setState({msg:data.msg});
            } else {

                document.querySelector('.LogInButton').click();
               
            }
            
        })


        task.getTimetable(user_id, this.state.heuristicDate, this.state.heuristicDate)
        .then(data => {
            console.log(data);
            if (data.success){

                this.setState({tasks:data.tasks});
                this.setState({success:true});
                this.setChart(data.tasks);

                console.log(user_id);
                task.getMaxHoursUID(user_id)
                .then(data1 => {
                   
                    console.log(data1);
                    if (data1.success){
                    this.setState({maxHours:data1.maxHours},() =>  this.calculateTime());
                    }
                    this.setState({msg:data.msg});
                })
            }
            this.setState({msg:data.msg});
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    setChart = (tasks) => {
        var taskNames = [];
        var taskHours = [];
        tasks.forEach(taskItem => {
            taskNames.push(taskItem.taskName);
            taskItem.timetable.forEach(day => {
                if (day.date === this.state.heuristicDate){
                    taskHours.push(day.hours);
                }
            })
        });
        this.setState({
            pieChartData:{
                labels: taskNames,
                datasets: [
                    {
                      label: "Breakdown by Hours",
                      data: taskHours,
                      backgroundColor: ["#FFCCF9", "#D5AAFF", "#B5B9FF", "#85E3FF", "#F3FFE3", "#FFCBC1", "#6EB5FF", "#FFFFD1"]
                    }
                ]
            }
        })
    }

    calculateTime = () => {
        var totalHours = 0;
        this.state.tasks.map(taskItem => {
            taskItem.timetable.forEach(day => {
                if (day.date === this.state.heuristicDate){
                    totalHours += day.hours;
                }
            })
        });
        this.setState({totalHours:totalHours});
        var loadPercentage = (totalHours / this.state.maxHours) * 100;
        this.setState({loadPercentage:loadPercentage});
        if (totalHours > this.state.maxHours){
            this.setState({overloaded:true});
        }
    }

    render() {

        const size = {
            height:"300px",
            width:"300px"
        }
        const div_centre = {
            "justify-content":"center"
        }
        const text_centre = {
            "text-align":"center",
        }
            
        return (
            <div style={size}>
                {
                    this.state.pieChartData 
                        ?
                        <MDBContainer>
                            {
                                this.state.pieChartData.labels.length 
                                ?
                                <div>
                                    <Pie className="pie" data={this.state.pieChartData}/>
                                    <div style={div_centre}>
                                        <p style={text_centre}> 
                                        <br/>
                                        Total Hours: {this.state.totalHours}hrs
                                        <br/>
                                        Load Percentage: {this.state.loadPercentage}%
                                        </p>
                                    {
                                        this.state.overloaded
                                        ?
                                        <p style={text_centre}>You are overloaded!</p>
                                        :
                                        <div/>
                                    }
                                    </div>
                                </div>
                                :
                                <div style={text_centre}>You have no tasks for this day!</div>
                            }
                            
                        </MDBContainer>
                        :
                    <h4 style={text_centre}>Loading...</h4>
                }
            </div>
        );
    }
}

export default HeuristicDaily;