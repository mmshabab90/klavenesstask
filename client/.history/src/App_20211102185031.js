import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Components/Homepage";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Contracts from "./Components/Contracts/Contracts";
import NewContract from "./Components/Contracts/NewContract";
import LoginComponent from "./Components/LoginComponent";

export default function App() {
  return (
    <div className="App">
      <Navigation />

      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={LoginComponent} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/new-contract" component={NewContract} />
        </Switch>
      </Router>
    </div>
  );
}
