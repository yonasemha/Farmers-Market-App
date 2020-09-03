import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AppNavbar from "../src/components/AppNavBar";
import "./App.css";

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <AppNavbar />
      </BrowserRouter>
    );
  }
}

export default App;
