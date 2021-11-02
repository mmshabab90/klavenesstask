import React from "react";
import GoogleLogin from "react-google-login";

export default function Homepage() {
  return (
    <div className="home__page">
      <div className="login__message">
        <h1>Welcome to Klaveness Digital</h1>
        <p>Login to access the the available client contracts</p>

        <GoogleLogin clientId="" render={(renderProps) => <Button></Button>} />
      </div>
    </div>
  );
}
