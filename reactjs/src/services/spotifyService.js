import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://projectportfolio3-d62d160438fd.herokuapp.com/api"
    : "http://localhost:3000/api";

export const searchMusic = async (query) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${API_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        query,
        type: "track,album,artist",
      },
    });

    console.log("Spotify API response:", response.data);
    console.table("tracks:", response.data.tracks.items);
    console.table("artists:", response.data.artists.items);
    console.log("albums:", response.data.albums.items);

    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
