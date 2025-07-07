import React from "react";
import "./App.css";
import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Components/Home"; // Assicurati di avere questa importazione!

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Home />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
