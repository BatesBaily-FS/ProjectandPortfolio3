import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMusic } from "../services/spotifyService";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchMusic(query, "track,album,artist");

      navigate({
        pathname: "/results",
        state: { results: data },
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
