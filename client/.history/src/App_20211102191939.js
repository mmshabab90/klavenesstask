import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./Components/Homepage";
import Navigation from "./Components/Navigation";

export default function App() {
  return (
    <div className="App">
      <Navigation />
      <Homepage />
    </div>
  );
}
