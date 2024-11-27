const express = require("express");
const axios = require("axios");
const router = express.Router();
const authJWT = require("../middlewares/authJWT");

router.use(authJWT);

const isTokenExpired = (accessToken) => {
  if (!accessToken) return true;
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

const refreshAccessToken = async (refreshToken) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_types: "refresh_token",
          refresh_token: refreshToken,
          client_id: client_id,
          client_secret: client_secret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing access token", error);
    throw new Error("Could not refresh accesss token");
  }
};

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    if (isTokenExpired(req.user.accessToken)) {
      console.log("Access token expired, refreshing...");
      const newAccessToken = await refreshAccessToken(req.user.refreshToken);
      req.user.accessToken = newAccessToken;
    }

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
      params: {
        q: query,
        type: "tracks,album,artist",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching Spotify");
  }
});

module.exports = router;
