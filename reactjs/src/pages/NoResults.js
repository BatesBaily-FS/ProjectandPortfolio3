import React from "react";
// import SearchComponent from "../components/SearchComponent";

function noResults() {
  return (
    <div>
      {/* <SearchComponent /> */}
      <main className="main-noresults">
        <h1>No Results</h1>
        <h3>Please type in a search to get started</h3>
      </main>
    </div>
  );
}

export default noResults;
