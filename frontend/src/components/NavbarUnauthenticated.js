import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavbarUnauthenticated = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/home">TaskMaster</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarUnauthenticated;