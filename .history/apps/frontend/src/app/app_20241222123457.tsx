import React from "react";
import {
  BrowserRouter as Router,  
  Route,
} from "react-router-dom";
import Stocks from "../stocks";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Stocks} />      
    </Router>
  );
}