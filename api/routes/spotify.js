const express = require("express");
const axios = require("axios");
const router = express.Router();
const authJWT = require("../middlewares/authJWT");

router.use(authJWT);

router.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!req.user || !req.user.accessToken) {
    return res.status(401).send("Access Token is missing");
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
      params: {
        q: query,
        type: "track,album,artist",
      },
    });

    console.log("Spotify API response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching Spotify");
  }
});

module.exports = router;
