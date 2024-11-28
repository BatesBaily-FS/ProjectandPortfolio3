import { useLocation, Link } from "react-router-dom";
import logo from "../components/spotifyLogo1.png";
import SearchComponent from "./searchComponent";

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} className="logo" />
      </div>
      {(location.pathname === "/noresults" ||
        location.pathname === "/results") && <SearchComponent />}
    </header>
  );
}
export default Header;
