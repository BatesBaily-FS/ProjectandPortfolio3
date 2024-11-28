import React from "react";
import { useLocation } from "react-router-dom";

function Results() {
  const location = useLocation();
  const results = location.state?.results || {};

  console.log("Location State:", location.state);
  console.log("Results:", results);

  const tracks = results.tracks?.items || [];
  const albums = results.albums?.items || [];
  const artists = results.artists?.items || [];

  console.table(tracks);
  console.table(artists);
  console.table(albums);

  return (
    <div className="results-page">
      <h1>Search Results</h1>

      {artists.length > 0 && (
        <div>
          <h2>Artists</h2>
          {artists.map((artist) => (
            <div key={artist.id}>
              <h3>{artist.name}</h3>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener no referrer"
              >
                View on Spotify
              </a>
            </div>
          ))}
        </div>
      )}

      {albums.length > 0 && (
        <div>
          <h2>Albums</h2>
          {albums.map((album) => (
            <div key={album.id}>
              <h3>{album.name}</h3>
              <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener no referrer"
              >
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      )}

      {tracks.length > 0 && (
        <div>
          <h2>Tracks</h2>
          {tracks.map((track) => (
            <div key={track.id}>
              <h3>{track.name}</h3>
              <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener no referrer"
              >
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      )}

      {artists.length === 0 && albums.length === 0 && tracks.length === 0 && (
        <p>No results found</p>
      )}
    </div>
  );
}

export default Results;
