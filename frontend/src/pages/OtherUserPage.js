import React, { useState, Component, setState } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Router } from "react-router";
import { Icon } from "rsuite";
import user from "../utils/user";
import auth from "../utils/auth";
import 'rsuite/dist/styles/rsuite-default.css';
import NavbarAuthenticated from "../components/NavbarAuthenticated";
import Title from "../components/Header";
import "../StyleSheets/ProfileSearch.css"

const styles = {
    width: 150,
    height: 150
};

class OtherUserPage extends React.Component {

    state = {
        user_id: null,
        email: "",
        fname: "",
        lname: "",
        msg: "",
        fileInfo: null,
        connectionState: null,
        searchTerm: ""
    }

    componentDidMount() {
        var uid = null;
        if (this.props.location.user_id) {
            uid = this.props.location.user_id;
            this.setState({ user_id: uid })
        }

        user.getUserProfile(uid)
            .then(data => {
                if (data.success === true) {
                    this.setState({ msg: "" });
                    this.setState({ email: data.profile.email });
                    this.setState({ fname: data.profile.firstName });
                    this.setState({ lname: data.profile.lastName });
                }
                else {
                    this.setState({ msg: data.msg });
                    this.setState({ email: "" });
                    this.setState({ fname: "" });
                    this.setState({ lname: "" });
                }
            })
            .catch(err => {
                this.setState({ msg: "An error has occured" });
            })

        user.getProfileImage(uid)
            .then(data => {
                if (data) {
                    data = "data:image/jpeg;base64," + data;
                    this.setState({ fileInfo: data });
                }
                else {
                    this.setState({ fileInfo: null });
                }
            })
            .catch(err => {
                this.setState({ msg: "An error has occured" });
            })

        user.checkConnectionState(uid)
            .then(data =>{
                if (data.success){
                    this.setState({connectionState:data.msg});
                }
                else{
                    this.setState({msg:data.msg})
                }
            })
            .catch(err => {
                this.setState({msg:err});
            })
    }

    requestConnection = () => {
        user.requestConnection(this.state.user_id)
        .then(data => {
            if (data.success){
                window.location.href="/profile";
            }
            else{
                this.setState({msg:data.msg});
            }
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    acceptConnection = () => {
        user.respondToRequest(this.state.user_id, true)
        .then(data => {
            if (data.success){
                window.location.href="/profile";
            }
            else{
                this.setState({msg:data.msg});
            }
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    declineConnection = () => {
        user.respondToRequest(this.state.user_id, false)
        .then(data => {
            if (data.success){
                window.location.href="/profile";
            }
            else{
                this.setState({msg:data.msg});
            }
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    removeConnection = () => {
        user.removeConnection(this.state.user_id)
        .then(data => {
            if (data.success){
                window.location.href="/profile";
            }
            else{
                this.setState({msg:data.msg});
            }
        })
        .catch(err => {
            this.setState({msg:err});
        })
    }

    render() {
        let connectButton = <div>There seems to be some issues connecting with this user...</div>
        let calendarLink = <div> Connect with this user to view their calendar </div>
        if (this.state.connectionState === 0){
            connectButton = <button className="connectButton"onClick={this.requestConnection}> Connect </button>
        }
        else if (this.state.connectionState === 1){
            connectButton = (
            <div>
            <div> You are currently connected with this user </div>
            <button className="buttonC" onClick={this.removeConnection}> Remove Connection </button>
            </div>
            );
            calendarLink = (
                <div>
                <Link className="linkButton" to={{pathname:"/calendar", user_id:this.state.user_id}}>View Calendar </Link>
                </div>
            );
        }
        else if (this.state.connectionState === 2){
            connectButton = <div>Connection request sent</div>
        }
        else if (this.state.connectionState === 3){
            connectButton = (
                <div>
                <div>The user has asked for a connection</div>
                <button className="buttonC" onClick={this.acceptConnection}> Accept </button>
                <button className="buttonC" onClick={this.declineConnection}> Decline </button>
                </div>
            );
        }
        else if (this.state.connectionState === 4){
            connectButton = (<Redirect to="/profile"></Redirect>)
        }

        return (
            <div>
                <Title />
                <NavbarAuthenticated />
                <div className="otherUser">
                    <h1 className="Heading">{this.state.fname} {this.state.lname}</h1>
                    <h4>{this.state.email}</h4>
                    <div>{this.state.msg}</div>
                    <div>{
                        this.state.fileInfo ?
                            (<img src={this.state.fileInfo} style={styles} />)
                            :
                            (<Icon icon="avatar" size="5x" />)
                    }</div>
                    <div className="msg">
                    {connectButton}
                    </div>
                    <div className="msg">
                    {calendarLink}
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherUserPage;
