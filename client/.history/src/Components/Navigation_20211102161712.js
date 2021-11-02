import React from "react";
import {
  Container,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectSignedIn, selectUserData } from "../features/userSlice";

const Navigation = () => {
  const [searchValue, SetSearchValue] = React.useState("");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

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
          {isSignedIn && (
            <Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => SetSearchValue(e.target.value)}
                />
                <Button variant="outline-success" onClick={handleClick}>
                  Search
                </Button>
              </Form>
              <Image
                src=""
                alt="user-avatar"
                width="30"
                height="30"
                className="d-inline-block align-top"
                roundedCircle
              />
              <Nav.Link href="#deets">Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
