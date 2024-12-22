import React from "react";
import {
  BrowserRouter as Router,
  Switch,
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
        <Switch>
          <Route path="/">
            <Stocks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}