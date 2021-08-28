import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoutButton from "./LogoutButton";
import { Link } from 'react-router-dom';

const NavbarAuthenticated = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>

                <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/calendar" user_id="0">My Tasks</Nav.Link>
                    <Nav.Link href="/add_task" > Create Task </Nav.Link>
                    <Nav.Link href="/search_user" > User Search </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/profile">My Profile</Nav.Link>
                    <Nav.Link href="/home"><LogoutButton/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarAuthenticated;