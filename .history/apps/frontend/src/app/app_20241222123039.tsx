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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Stocks</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/">
            <Stocks />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}