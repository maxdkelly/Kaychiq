import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import LogInBox from "../StyleSheets/LogInBox.css";
import Header from "../components/Header.js"
import NavbarUnauthenticated from "../components/NavbarUnauthenticated";

export const ForgotPasswordPage = props =>{
    // TODO Navbar
    return (
        <body>
            <Header/>
            <NavbarUnauthenticated/>
            <div className="LogInBox">
                <h1 className="Heading">Forgot your password?</h1>
                <p>Please provide your email address so we can email you your password reset instructions</p>
                <ForgotPasswordForm/>
            </div>
        </body>
    )
}

