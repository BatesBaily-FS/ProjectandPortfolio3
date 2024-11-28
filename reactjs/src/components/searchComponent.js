import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMusic } from "../services/spotifyService";
import "../App.css";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    try {
      const data = await searchMusic(query);
      console.log("Search Results Data:", data);
      navigate({
        pathname: "/results",
        state: {
          results: {
            tracks: data.tracks.items,
            albums: data.albums.items,
            artists: data.artists.items,
          },
        },
      });
      console.log("Navigating to results with state:", { results: data });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
