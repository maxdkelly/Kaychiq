import React, { useState, Component, setState } from "react";
import user from "../utils/user";
import "../StyleSheets/ProfilePage.css"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Calendar, LineChart } from "grommet-icons";

class Connections extends React.Component {

    state = {
        user_id:0,
        connections:[],
        connectionRequests:[],
        pendingConnections:[],
        msg:""
    }

    componentDidMount(){

       
        user.getConnections(this.state.user_id)
        .then(data => {
            if (data.success){
                this.setState({connections:data.connections})
            }
            else{
                this.setState({msg:data.msg})
            }
        })
        .catch(err => {
            this.setState({msg:err})
        })


        user.getConnectionRequests(this.state.user_id)
        .then(data => {
            if (data.success){
                console.log(data)
                this.setState({connectionRequests:data.incoming_connection, pendingConnections: data.outgoing_connection})
            }
            else{
                this.setState({msg:data.msg})
            }
        })
        .catch(err => {
            this.setState({msg:err})
        })
    }

    handleAccept(user_id) {
        console.log(user_id)

    }

    render() {
        return (
            <div >
                <h4 className="connections">Connections: </h4>
                {this.state.connections.map(connection => {
                    return (
                        <div>
                            <Link className="link"
                            to={{pathname:"view_user", user_id:connection.user_id}} 
                            style={{ color: 'white' }}>

                                <button className="connectionButton">

                                    {connection.firstName} {connection.lastName} <Link  to={{pathname:"calendar", user_id:connection.user_id}}  ><Calendar></Calendar></Link>
                                    <Link  to={ {
                                        pathname:"dashboard", 
                                        user_id:connection.user_id,
                                        user_name:connection.firstName + " " + connection.lastName
                                    }} ><LineChart></LineChart></Link>
                                </button>

                            </Link>
                           
                        </div>
                    )
                })}

                <h4 className="connections">Connection Requests: </h4>
                {this.state.connectionRequests.map(connection => {
                    return (
                        <div>
                            
                                <Link className="link"
                                to={{pathname:"view_user", user_id:connection.user_id}} 
                                style={{ color: 'white' }}>
                                    <button className="connectionButton">
                                    {connection.firstName} {connection.lastName} 

                                    </button>

                                </Link>
                           
                        </div>
                    )
                })}

                <h4 className="connections">Pending Connections: </h4>
                {this.state.pendingConnections.map(connection => {
                    return (
                        <div>
                            
                                <Link className="link"
                                to={{pathname:"view_user", user_id:connection.user_id}} 
                                style={{ color: 'white' }}>
                                    <button className="connectionButton">
                                    {connection.firstName} {connection.lastName}

                                    </button>

                                </Link>
                           
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Connections;