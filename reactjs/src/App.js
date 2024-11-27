import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import NoResults from "./pages/NoResults";
import Results from "./pages/Results";
import Login from "./pages/Login";
import AuthCallback from "./components/AuthCallback.js";
import SearchComponent from "./components/searchComponent.js";
import logo from "./components/spotifyLogo1.png";

function App() {
  return (
    <Router>
      <Header />
      <MainRoutes />
    </Router>
  );
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/noresults" element={<NoResults />} />
      <Route path="/results" element={<Results />} />
      {/* <Route path="/search" element={<SearchComponent />} /> */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} className="logo" />
      </div>
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
      {(location.pathname === "/noresults" ||
        location.pathname === "/results") && <SearchComponent />}
    </header>
  );
}

export default App;
