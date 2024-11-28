import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { DataProvider } from "./components/DataContext.js";

import Header from "./components/Header.js";
import NoResults from "./pages/NoResults";
import Results from "./pages/Results";
import Login from "./pages/Login";
import AuthCallback from "./components/AuthCallback.js";
import SearchComponent from "./components/searchComponent.js";

function App() {
  return (
    <DataProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/noresults" element={<NoResults />} />
          <Route path="/results" element={<Results />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
