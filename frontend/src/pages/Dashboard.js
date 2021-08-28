import React, {Component} from "react";
import Header from "../components/Header.js"
import LogoutButton from "../components/LogoutButton.js";
import NavbarAuthenticated from "../components/NavbarAuthenticated.js";
import "../StyleSheets/Dashboard.css"
import HeuristicDaily from "../components/HeuristicDaily.js";
import moment from "moment";
import HeuristicWeekly from "../components/HeuristicWeekly.js";

class Dashboard extends React.Component {

    state = {
        user_id:0,
        user_name:""
    }

    componentDidMount(){
        
        console.log(this.props)
        if("user_id" in this.props.location) {
            this.setState({user_id: this.props.location.user_id, user_name: this.props.location.user_name + "'s "}, () => console.log(this.state));
        }

     }

    render(){
        const row = { 
            height: 500, 
            display:"flex", 
            "flex-direction":"row", 
            "justify-content":"center" ,
            padding: 30,
            margin: 10
        };
        const text_centre = {
            "text-align":"center"
        };
        const overview = {
            "text-align":"center",
            padding: 20,
            margin: 10
        }
        return (
            <div>
                <Header />
                <NavbarAuthenticated/>
                <div className="tasksBox">
                    <h2 style={overview}>{this.state.user_name} Daily Overview</h2>
                    <div style={row}>
                        <div>
                        <p style={text_centre}><b>Yesterday's Workload:</b></p>
                        <HeuristicDaily heuristicDate={moment(new Date()).add(-1, "days").format("DD/MM/YYYY")} user_id={this.state.user_id}/>
                        </div>
                        <div>
                        <p style={text_centre}><b>Today's Workload:</b></p>
                        <HeuristicDaily heuristicDate={moment(new Date()).format("DD/MM/YYYY")} user_id={this.state.user_id}/>
                        </div>
                        <div>
                        <p style={text_centre}><b>Tomorrow's Workload:</b></p>
                        <HeuristicDaily heuristicDate={moment(new Date()).add(1, "days").format("DD/MM/YYYY")} user_id={this.state.user_id} />
                        </div>
                    </div>
                    <div>
                        <h2 style={overview}>Weekly Overview</h2>
                        <HeuristicWeekly user_id={this.state.user_id}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;