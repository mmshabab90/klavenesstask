import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectSignedIn } from "./userSlice";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSignedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ path: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
