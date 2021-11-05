import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
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

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(searchValue));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(setSearchInput(searchValue));
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Klaveness Digital</Navbar.Brand>
        {isSignedIn && <Navbar.Toggle aria-controls="responsive-navbar-nav" />}
        <Navbar.Collapse id="responsive-navbar-nav">
          {isSignedIn && (
            <Nav className="me-auto" style={{ margin: 5 }}>
              <Navbar.Text style={{ marginLeft: 5, marginRight: 5 }}>
                Welcome: {userData?.name}
              </Navbar.Text>
            </Nav>
          )}
          {isSignedIn && (
            <Nav>
              <Form className="d-flex" style={{ margin: 5 }}>
                <InputGroup className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchValue}
                    onChange={(e) => SetSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                  >
                    Search
                  </Button>
                </InputGroup>
              </Form>

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
