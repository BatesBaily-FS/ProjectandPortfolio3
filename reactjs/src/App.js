import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header.js";
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
      <Route
        path="/noresults"
        element={
          <>
            <NoResults />
            <SearchComponent />
          </>
        }
      />
      <Route
        path="/results"
        element={
          <>
            <Results />
            <SearchComponent />
          </>
        }
      />
      <Route path="/search" element={<SearchComponent />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

export default App;
