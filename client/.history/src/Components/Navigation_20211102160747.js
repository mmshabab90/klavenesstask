import React from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectSignedIn } from "../features/userSlice";

const Navigation = () => {
  const [searchValue, SetSearchValue] = React.useState("");
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#contracts">Contracts</Nav.Link>
            <Nav.Link href="#new-contract">New Contract</Nav.Link>
          </Nav>
          <Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav.Link href="#deets">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
