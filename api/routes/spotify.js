const express = require("express");
const axios = require("axios");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
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
