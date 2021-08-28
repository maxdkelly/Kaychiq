import React from "react";
import { Redirect } from "react-router";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header"
import LogInBox from "../components/LogInBox.js";
import login from "../StyleSheets/LoginPage.css"
import auth from "../utils/auth";
import NavbarUnauthenticated from "../components/NavbarUnauthenticated";

class LoginPage extends React.Component{

    state = {
        authenticated:false
    };

    componentDidMount(){
        this.checkAuthentication();
    }

    checkAuthentication = async () => {
        let isAuthenticated = await auth.isAuthenticated();
        this.setState({authenticated:isAuthenticated});
    }

    render(){
        if(this.authenticated){
            return(
                <Redirect to="/dashboard"/>
            );
        }
        else{
            return(
                <body>
                    <Header> </Header>
                    <NavbarUnauthenticated/>
                    <LogInBox/> 
                </body>
            )
        }
    }
}

export default LoginPage;