import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Stocks from "../stocks";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Stocks} />
      </Routes>
    </Router>

  );
}