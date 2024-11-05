const express = require("express");
const axios = require("axios");
const { verifyToken } = require("../services/auth");

const router = express.Router();

router.use(verifyToken);

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(`http://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
      params: {
        q: query,
        type: "albums,artist,track",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching Spotify");
  }
});

module.exports = router;
