import axios from "axios";
import Cookies from 'js-cookie';
import auth from "./auth";

/*
task:{
    taskName: "",
    taskDescription: "",
    taskTags:["a", "b", ...],
    priority: "",
    startDate:"DD/MM/YY",
    endDate:"DD/MM/YY",
    hours:{
        "DD/MM/YY":0,
        "DD/MM/YY":0,
        "DD/MM/YY":0
        ...
    }
}
*/

class Task {
    constructor() {
        this.url = "http://localhost:5000";
        this.token = auth.getAuthenticationToken();
    }

    getTimetable(user_id, startDate, endDate) {
        return axios.post('/api/getTimetable', {
            token: this.token,
            user_id,
            startDate,
            endDate
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    getSortedTimetable(user_id, startDate, endDate, sortKey) {
        return axios.post('/api/getSortedTimetable', {
            token: this.token,
            user_id,
            startDate,
            endDate,
            sortKey : sortKey
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }


    getTask(task_id, user_id) {
        return axios.post('/api/getTask', {
            token: this.token,
            task_id,
            user_id
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    getMaxHours() {
        return axios.post('/api/getMaxHours', {
            token: this.token
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    getMaxHoursUID(user_id) {
        return axios.post('/api/getMaxHoursUID', {
            token: this.token,
            user_id
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

   
    changeMaxHours(max_hours) {
        return axios.post('/api/changeMaxHours', {
            token: this.token,
            max_hours
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    addTask(task) {
        return axios.post('/api/addTask', {
            token: this.token,
            task
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    deleteTask(task_id) {
        return axios.post('/api/deleteTask', {
            token: this.token,
            task_id
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    updateTask(task_id, task) {
        return axios.post('/api/updateTask', {
            token: this.token,
            task_id,
            changes:task
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    completeTask(task_id, date) {
        return axios.post('/api/completeTask', {
            token: this.token,
            task_id,
            date
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    undoCompleteTask(task_id) {
        return axios.post('/api/undoCompleteTask', {
            token: this.token,
            task_id
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    searchTaskName(user_id, taskname, startDate, endDate) {
        return axios.post('/api/searchTaskName', {
            token: this.token,
            user_id,
            taskname,
            startDate,
            endDate
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    searchTaskTag(user_id, tag, startDate, endDate) {

        return axios.post('/api/searchTaskTag', {
            token: this.token,
            user_id,
            tag,
            startDate,
            endDate
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    getTags() {
        return axios.post('/api/getTags', {
            token: this.token,
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    getContributors(task_id) {
        return axios.post('/api/getContributors', {
            token: this.token,
            task_id
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }
    
}

export default new Task;
