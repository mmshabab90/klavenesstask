import React from "react";
import {
  Container,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { GoogleLogout } from "react-google-login";
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
            {isSignedIn && (
              <NavX.Link href="#new-contract">New Contract</NavX.Link>
            )}
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
              <Navbar.Text>Signed in as: {userData?.familyName}</Navbar.Text>
              <Image
                src={userData?.imageUrl}
                alt={userData?.name}
                width="30"
                height="30"
                className="d-inline-block align-top"
                roundedCircle
              />
              {/* <Nav.Link href="#deets">Logout</Nav.Link> */}
              <GoogleLogout clientId={process.env.REACT_APP_GAPI_KEY} />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
