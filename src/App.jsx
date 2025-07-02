import React from "react";
import "./App.css";
import { NavBar } from "./Components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar />
    </Router>
  );
}

export default App;
