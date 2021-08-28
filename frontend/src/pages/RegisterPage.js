import React from "react";
import Title from "../StyleSheets/Title.css"
import Header from "../components/Header.js"
import SignUpForm from "../components/SignUpForm";
import NavbarUnauthenticated from "../components/NavbarUnauthenticated";


export const RegisterPage = props => {
    return (
        <body>
            <Header> </Header>
            <NavbarUnauthenticated />
            <div className="LogInBox">
                <h1 className="Heading">Register </h1>
                <SignUpForm></SignUpForm>
            </div>


        </body>
    )
}