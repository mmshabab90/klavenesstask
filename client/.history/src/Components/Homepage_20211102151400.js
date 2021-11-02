import React from "react";
import GoogleLogin from "react-google-login";

export default function Homepage() {
  return (
    <div className="home__page">
      <div className="login__message">
        <h1>Welcome to Klaveness Digital</h1>
        <p>Login to access the the available client contracts</p>

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
      </div>
    </div>
  );
}
