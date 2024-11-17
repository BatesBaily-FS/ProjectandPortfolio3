const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const JWTModel = require("../models/jwtSchema");
const router = express.Router();

require("dotenv").config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
console.log("client_id:", client_id);
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
console.log("client_secret", client_secret);
const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://projectportfolio3-d62d160438fd.herokuapp.com/auth/callback"
    : "http://localhost:8888/auth/callback";

function generateRandomString(length) {
  const characters =
    "abcdefghijklmnopqurstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

router.get("/login", function (req, res) {
  console.log("client id:", client_id);
  const state = generateRandomString(16);
  req.session.state = state;
  const scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
      })
  );
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const error = req.query.error;
  const state = req.query.state;

  console.log("Code recieved:", code);
  console.log("State recieved:", state);

  if (state === null) {
    return res.redirect(
      "/#" + querystring.stringify({ error: "state_mismatch" })
    );
  }

  if (error) {
    console.error("Authentication Error:", error);
    return res.redirect("/login");
  }

  if (code) {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirect_uri,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
          },
        }
      );

      const data = response.data;
      console.log("Token Response:", data);

      if (response.status === 200) {
        const accessToken = data.access_token;

        const userResponse = await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { id } = userResponse.data;

        let user = await User.findOne({ spotifyId: id });
        if (!user) {
          user = await User.create({
            spotifyId: id,
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        await JWTModel.create({ token, userId: user._id });

        res.cookie("jwt", token, { httpOnly: true });

        res.redirect("/noresults");
      } else {
        console.error("Error fetching token", data);
        res.redirect("/login");
      }
    } catch (error) {
      console.error("Network error", error);
      res.redirect("/login");
    }
  } else {
    console.error("No authorization code in URL");
    res.redirect("/login");
  }
});

module.exports = router;
