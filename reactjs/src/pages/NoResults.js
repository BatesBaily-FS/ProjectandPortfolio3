import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../components/spotifyLogo1.png";
import backImg1 from "../components/background1.png";
import backImg2 from "../components/background2.png";

// import SearchComponent from "../components/SearchComponent";

const NoResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      console.log("Access Token stored in localStorage:", accessToken);
    } else {
      console.log("No access token found");
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="noresults-page">
      {/* <SearchComponent /> */}
      <main className="main-noresults">
        <img src={logo} className="page-logo" />
        <h1>No Results</h1>
        <h3>Please type in a search to get started</h3>
      </main>
    </div>
  );
};

export default NoResults;
