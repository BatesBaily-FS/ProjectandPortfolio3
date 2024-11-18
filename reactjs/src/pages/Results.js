import React from "react";
import { useLocation } from "react-router-dom";
// import SearchComponent from "../components/SearchComponent";

function Results() {
  const location = useLocation();
  const { results } = location.state || {
    results: { tracks: {}, albums: {}, artists: {} },
  };

  return (
    <div>
      {/* <SearchComponent /> */}
      <main>
        <h1>Search Results</h1>
        <section className="categories">
          <h2>Tracks</h2>
          <ul>
            {/* {results.tracks?.items.map((track) => (
              <li key={track.id}>
                {track.name} by{" "}
                {track.artists.map((artist) => artist.name).join(", ")}
              </li>
            ))} */}
          </ul>
        </section>
        <section className="categories">
          <h2>Albums</h2>
          <ul>
            {/* {results.albums?.items.map((album) => (
              <li key={album.id}>
                {album.name} by{" "}
                {album.artists.map((artist) => artist.name).join(", ")}
              </li>
            ))} */}
          </ul>
        </section>
        <section className="categories">
          <h2>Artists</h2>
          <ul>
            {/* {results.artists?.items.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))} */}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Results;
