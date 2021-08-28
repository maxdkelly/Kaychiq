import React from "react";
import LogInBox from "../StyleSheets/LogInBox.css";
import Header from "../components/Header.js"
import { Link } from "react-router-dom";

export const CheckEmailPage = props => {
    return (
        <body>
            <div className="LogInBox">
                <Header/>
                <h1 className="Heading">You've successfully reset your password</h1>
                <h1 className="Heading">Please check your email for your password reset instructions</h1>
                <Link to={'/home'} className="link"> Go home </Link>
            </div>
        </body>
    )
}