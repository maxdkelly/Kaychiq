import React from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";
import NavbarAuthenticated from "../components/NavbarAuthenticated";
import LogInBox from "../StyleSheets/LogInBox.css";


export const ChangePasswordPage = props => {
    // TODO Navbar
    return (
        <body>
            <NavbarAuthenticated/>
            <div className="LogInBox">
                <h1 className="Heading">Change your password </h1>
                <ChangePasswordForm/>
            </div>
        </body>
    )
}