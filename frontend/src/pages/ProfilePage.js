import React from "react";
import Title from "../components/Header.js";
import NavbarAuthenticated from "../components/NavbarAuthenticated.js";
import ProfileForm from "../components/ProfileForm.js";
import "../StyleSheets/ProfilePage.css";

export const ProfilePage = props => {
    return (
        <div>
            <Title />
            <NavbarAuthenticated/>
            <ProfileForm className="homeContainer"/>
        </div>
    )
}