import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import NoResults from "./pages/NoResults";
import Results from "./pages/Results";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <div>
            <nav>
              <ul className="navigation">
                <li>
                  <Link to="/noresults">No Results</Link>
                </li>
                <li>
                  <Link to="/results">Results</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/noresults" element={<NoResults />} />
          <Route path="/results" element={<Results />} />
          {/* <Route path="/search" element={<SearchComponent />} /> */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
