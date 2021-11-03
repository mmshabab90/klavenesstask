import React from "react";
import { Card, Button } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { setSignedIn, setUserData } from "../features/userSlice";

export default function LoginComponent() {
  const dispatch = useDispatch();

  const login = (response) => {
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
    localStorage.setItem("user", response.profileObj);
  };

  return (
    <Card className="text-center">
      <Card.Header>Welcome</Card.Header>
      <Card.Body>
        <Card.Title>Klaveness Digital Case Project</Card.Title>
        <Card.Text>
          Login to access the the available client contracts
        </Card.Text>
        <GoogleLogin
          clientId={process.env.REACT_APP_GAPI_KEY}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="login__button"
            >
              Login With Google
            </Button>
          )}
          onSuccess={login}
          onFailure={login}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      </Card.Body>
      <Card.Footer className="text-muted">
        Developed By Meeyad Shabab
      </Card.Footer>
    </Card>
  );
}
