import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Components/Homepage";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contracts from "./Components/Contracts/Contracts";
import NewContract from "./Components/Contracts/NewContract";
import LoginComponent from "./Components/LoginComponent";
import ProtectedRoute from "./features/ProtectedRoutes";
import { useSelector } from "react-redux";
import { selectSignedIn } from "./features/userSlice";

export default function App() {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="App">
      <Navigation />

      <Router>
        <Switch>
          <Route exact path="/login" component={LoginComponent} />
          <ProtectedRoute
            exact
            path="/"
            component={Homepage}
            auth={isSignedIn}
          />
          <ProtectedRoute
            exact
            path="/contracts"
            component={Contracts}
            auth={isSignedIn}
          />
          <ProtectedRoute
            path="/new-contract"
            component={NewContract}
            auth={isSignedIn}
          />
        </Switch>
      </Router>
    </div>
  );
}
