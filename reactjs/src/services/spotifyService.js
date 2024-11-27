import axios from "axios";

const API_URL = "http://localhost:3000";

export const searchMusic = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
