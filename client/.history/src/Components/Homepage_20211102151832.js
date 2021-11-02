import React from "react";
import GoogleLogin from "react-google-login";
import { Button, Card } from "react-bootstrap";

export default function Homepage() {
  const login = (response) => {
    console.log(response);
  };

  return (
    <div className="home__page">
      <Card className="text-center">
        <Card.Header>Welcome to Klaveness Digital</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            Login to access the the available client contracts
          </Card.Text>
          <GoogleLogin
            clientId=""
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
    </div>
  );
}
