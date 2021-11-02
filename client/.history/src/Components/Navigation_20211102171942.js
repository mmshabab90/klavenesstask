import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Image,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setSearchInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import LockIcon from "@material-ui/icons/Lock";

const Navigation = () => {
  const [searchValue, SetSearchValue] = React.useState("");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setUserData(null));
    dispatch(setSignedIn(false));
  };

  const handleClick = () => {
    if (event.key === "Enter") {
      console.log(searchValue);
    }
    dispatch(setSearchInput(searchValue));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(searchValue);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Klaveness Digital</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isSignedIn && (
              <>
                <Nav.Link href="#contracts">Contracts</Nav.Link>
                <Nav.Link href="#new-contract">New Contract</Nav.Link>
              </>
            )}
          </Nav>
          {isSignedIn && (
            <Nav>
              <Form className="d-flex">
                <InputGroup className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchValue}
                    onChange={(e) => SetSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button variant="outline-secondary" onClick={handleClick}>
                    Search
                  </Button>
                </InputGroup>
              </Form>
              <Image
                src={userData?.imageUrl}
                alt={userData?.name}
                style={{ marginLeft: 10, marginRight: 5, marginTop: 5 }}
                width="30"
                height="30"
                className="d-inline-block align-top"
                roundedCircle
              />
              <Navbar.Text style={{ marginLeft: 5, marginRight: 5 }}>
                {userData?.familyName}
              </Navbar.Text>
              <GoogleLogout
                clientId={process.env.REACT_APP_GAPI_KEY}
                render={(renderProps) => (
                  <Button
                    variant="outline-danger"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="logout__button"
                  >
                    <LockIcon />
                  </Button>
                )}
                onLogoutSuccess={logout}
              />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
