import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar, {NavbarProps} from 'react-bootstrap/Navbar';


function Header(props: NavbarProps) {
    return (
        <Navbar {...props}>
            <Container>
                <Navbar.Brand>Book of Recipes</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

Header.defaultProps = {
    as: "header",
};

export default Header;