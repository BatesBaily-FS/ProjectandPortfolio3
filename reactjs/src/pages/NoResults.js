import React from "react";

import logo from "../components/spotifyLogo1.png";
// import SearchComponent from "../components/SearchComponent";

function noResults() {
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
}

export default noResults;
