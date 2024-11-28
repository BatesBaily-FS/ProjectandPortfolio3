import React from "react";
import { useData } from "../components/DataContext";

function Results() {
  const { results } = useData();

  console.log("Results:", results);

  const tracks = results.tracks || [];
  const albums = results.albums || [];
  const artists = results.artists || [];

  const limitedTracks = tracks.slice(0, 4);
  const limitedAlbums = albums.slice(0, 4);
  const limitedArtists = artists.slice(0, 4);

  return (
    <div className="results-page">
      <h1 className="page=heading">Search Results</h1>
      <div className="results-container">
        {limitedArtists.length > 0 && (
          <div className="category">
            <h2>Artists</h2>
            <div className="item-list">
              {limitedArtists.map((artist) => (
                <div key={artist.id} className="item">
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
          </div>
        )}

        {limitedAlbums.length > 0 && (
          <div className="category">
            <h2>Albums</h2>
            <div className="item-list">
              {limitedAlbums.map((album) => (
                <div key={album.id} className="item">
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
          </div>
        )}

        {limitedTracks.length > 0 && (
          <div className="category">
            <h2>Tracks</h2>
            <div className="item-list">
              {limitedTracks.map((track) => (
                <div key={track.id} className="item">
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
          </div>
        )}

        {limitedArtists.length === 0 &&
          limitedAlbums.length === 0 &&
          limitedTracks.length === 0 && <p>No results found</p>}
      </div>
    </div>
  );
}

export default Results;
