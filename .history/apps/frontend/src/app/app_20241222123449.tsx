import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Stocks from "../stocks";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Stocks} />      
    </Router>
  );
}