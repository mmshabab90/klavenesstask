import React from "react";
import GoogleLogin from "react-google-login";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectSignedIn } from "../features/userSlice";

export default function Homepage() {
  const login = (response) => {
    console.log(response);
  };

  const isSignedIn = useSelector(selectSignedIn)

  return (
    <Container className="home__page">
      {isSignedIn ? (
        <Card className="text-center">
          <Card.Header>Welcome</Card.Header>
          <Card.Body>
            <Card.Title>Klaveness Digital Case Project</Card.Title>
            <Card.Text>
              Login to access the the available client contracts
            </Card.Text>
            <GoogleLogin
              clientId="68216221013-5ah1n35pf2fk75d2q8ns2pn0q2tpkl5v.apps.googleusercontent.com"
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
      ) : null}
    </Container>
  );
}
