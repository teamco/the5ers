import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Stocks from "../stocks";
import Stock from "../stocks/stock";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Stocks/>} />
        <Route path="/:id" element={<Stock/>} />
      </Routes>
    </Router>
  );
}