import { useLocation, Link } from "react-router-dom";
import logo from "../components/spotifyLogo1.png";

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} className="logo" />
      </div>
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
    </header>
  );
}
export default Header;
