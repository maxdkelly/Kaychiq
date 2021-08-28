import React, { useState, Component, setState } from "react";
import "../StyleSheets/ProfilePage.css"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import task from "../utils/task";
import { MDBContainer } from "mdbreact";
import {Line} from "react-chartjs-2";
import moment from "moment";

class HeuristicWeekly extends React.Component {
    state = {
        user_id:this.props.user_id,
        msg:"",
        totalHours:0,
        overloaded:false,
        loadPercentage:null,
        success:false,
        lineChartData: null
    }

    componentWillReceiveProps(props) {
        console.log(props)
        var user_id = 0;
        if (props.user_id) {
            user_id = props.user_id;
        }

        var lastWeekStart = moment(new Date()).add(-7, "days");
        var lastWeekEnd = moment(new Date()).add(-1, "days");
        var thisWeekStart = moment(new Date());
        var thisWeekEnd = moment(new Date()).add(6, "days");
        var lastWeekData = {};
        var thisWeekData = {};
        var labels = this.getLabels(thisWeekStart, thisWeekEnd);

        var p1 = task.getTimetable(user_id, moment(lastWeekStart).format('DD/MM/YYYY'), moment(lastWeekEnd).format('DD/MM/YYYY'))
        .then(data => {
            if (data.success){
                this.setState({success:true});
                lastWeekData = this.getWeeklyDataset(data.tasks, lastWeekStart, lastWeekEnd, "#6eb5ff", "Last Week");
                var p2 = task.getTimetable(user_id, moment(thisWeekStart).format('DD/MM/YYYY'), moment(thisWeekEnd).format('DD/MM/YYYY'))
                .then(data => {
                    if (data.success){
                        this.setState({success:true});
                        thisWeekData = this.getWeeklyDataset(data.tasks, thisWeekStart, thisWeekEnd, "#a79aff", "This Week");
                        this.setState({
                            lineChartData : {
                                labels: labels,
                                datasets : [
                                    lastWeekData,
                                    thisWeekData
                                ]
                            }
                        })
                    }
                    this.setState({msg:data.msg});
                })
                .catch(err => {
                    this.setState({msg:err});
                })
            }
            this.setState({msg:data.msg});
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    componentDidMount(){
        var lastWeekStart = moment(new Date()).add(-7, "days");
        var lastWeekEnd = moment(new Date()).add(-1, "days");
        var thisWeekStart = moment(new Date());
        var thisWeekEnd = moment(new Date()).add(6, "days");
        var lastWeekData = {};
        var thisWeekData = {};
        var labels = this.getLabels(thisWeekStart, thisWeekEnd);

        var p1 = task.getTimetable(this.state.user_id, moment(lastWeekStart).format('DD/MM/YYYY'), moment(lastWeekEnd).format('DD/MM/YYYY'))
        .then(data => {
            if (data.success){
                this.setState({success:true});
                lastWeekData = this.getWeeklyDataset(data.tasks, lastWeekStart, lastWeekEnd, "#6eb5ff", "Last Week");
                var p2 = task.getTimetable(this.state.user_id, moment(thisWeekStart).format('DD/MM/YYYY'), moment(thisWeekEnd).format('DD/MM/YYYY'))
                .then(data => {
                    if (data.success){
                        this.setState({success:true});
                        thisWeekData = this.getWeeklyDataset(data.tasks, thisWeekStart, thisWeekEnd, "#a79aff", "This Week");
                        this.setState({
                            lineChartData : {
                                labels: labels,
                                datasets : [
                                    lastWeekData,
                                    thisWeekData
                                ]
                            }
                        })
                    }
                    this.setState({msg:data.msg});
                })
                .catch(err => {
                    this.setState({msg:err});
                })
            }
            this.setState({msg:data.msg});
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    /*
    lineChartData : {
        labels: labels,
        datasets: [{
          label: 'Weekly Total Hours',
          data: data,
          fill: false,
          borderColor: 'cyan',
          tension: 0.1
        }]
    }
    */

    getLabels = (startDate, endDate) => {
        var taskDays = [];
        while (startDate <= endDate) {
            var temp = moment(startDate).format('dddd');
            taskDays.push(temp);
            startDate = moment(startDate).add(1, 'days');
        }
        return taskDays;
    }

    getWeeklyDataset = (tasks, startDate, endDate, colour, labelName) => {

        var taskDates = {};

        while (startDate <= endDate) {
            var temp = startDate.format('DD/MM/YYYY')
            taskDates[temp] = 0;
            startDate = moment(startDate).add(1, 'days');
        }

        tasks.forEach(taskItem => {
            taskItem.timetable.forEach(day => {
                if (day.date in taskDates){
                    taskDates[day.date] += day.hours;
                }
            })
        });

        var data = [];

        Object.keys(taskDates).forEach(key => {
            data.push(taskDates[key]);
        });
        
        var weeklyData = {
            label: labelName,
            data: data,
            fill: true,
            borderColor: colour,
            tension: 0.1
        }

        return weeklyData;
    }

    render(){

        return (
                <MDBContainer>
                    <Line data={this.state.lineChartData}/>
                </MDBContainer>
        )
    }
}

export default HeuristicWeekly;