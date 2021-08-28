import NavbarAuthenticated from "../components/NavbarAuthenticated";
import Title from "../components/Header";
import User from "../utils/user"
import ProfilePreview from "../components/ProfilePreview.js";

import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/ProfileSearch.css"

import { FormSearch } from "grommet-icons";

class ProfileSearchPage extends React.Component{

    state = {
        user_id:0,
        searchTerm:"",
        notConnectedUsers: [],
        connectedUsers: [],
        error: ""
    }

    componentDidMount() {
        if (this.props.location.user_id){
            this.setState({ user_id: this.props.location.user_id });
        }

        this.handleSearch= this.handleSearch.bind(this);

    }

    searchUsers() {
        User.searchUsers(this.state.searchTerm)
            .then(data => {
                if (data.success === true){
                    console.log(data);
                    this.setState({notConnectedUsers:data.notConnectedUsers});
                    this.setState({connectedUsers:data.connectedUsers});

                }
                else{
                    this.setState({error:data.msg});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleSearch(e) {

        if (e.target.value != "") {
            this.setState({ searchTerm : e.target.value },() => this.searchUsers());
        } else {
            this.setState({notConnectedUsers: []})
            this.setState({connectedUsers: []})

            this.setState({ searchTerm : e.target.value });
        }
   
    }
  

    render() {
        return (
            <div>
                <Title/>
                <NavbarAuthenticated/>

                <div className="tasksBox"> 
                    <div className="title">Search User</div>
                    <div className="searchUser">
                       
                    <div class="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control" value={this.state.searchTerm}
                            placeholder={"search user"}
                            onChange={(e) => this.handleSearch(e)}/>
                    </div>

                       
                    </div>
                    <div className={(this.state.searchTerm==="") ? "hidden": "usersBox"}>

                        <div><b>Unconnected Users:</b></div>
                        
                        <div className="uContainer"> 
                        {
                            this.state.notConnectedUsers.map((user) => {
                                // return <div>hi</div>
                                return <ProfilePreview key={user.id} userID={user.id} userName={user.firstName + " " + user.lastName}> hi</ProfilePreview>

                            
                            })
                        }
                        </div>
                        <div className={(this.state.notConnectedUsers.length=== 0) ? "noResults":"hidden"}> No users found </div>
                        <div className="connected" >
                            <div> <b>Connected Users:</b></div>
                            <div className="uContainer"> 
                            {
                                this.state.connectedUsers.map((user) => {
                                    // return <div>hi</div>
                                    return <ProfilePreview key={user.id} userID={user.id} userName={user.firstName + " " + user.lastName}> hi</ProfilePreview>

                                
                                })
                            }</div>
                            <div className={(this.state.connectedUsers.length=== 0) ? "noResults":"hidden"}> No users found </div>
                         </div>
                    </div>

                </div>
                
            </div>





        )

    }
    

}

export default ProfileSearchPage;