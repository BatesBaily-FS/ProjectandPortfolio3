import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const searchMusic = async (query) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${API_URL}/search`, {
      params: { query, type: "track,album,artist" },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
