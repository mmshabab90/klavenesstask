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

export default function App() {
  return (
    <div className="App">
      <Navigation />

      <Router>
        <Switch>
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/" component={Homepage} />
          <ProtectedRoute exact path="/contracts" component={Contracts} />
          <ProtectedRoute path="/new-contract" component={NewContract} />
          <Route path="*" component={() => "404 Not Found!"} />
        </Switch>
      </Router>
    </div>
  );
}
