const express = require("express");
const dotenv = require("dotenv");
const spotifyRoutes = require("./routes/spotify");
const axios = require("axios");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/auth/spotify", (req, res) => {
  const scope = "user-read-private user-read-email";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(scope)}`;
  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      })
    );

    const accessToken = response.data.access_token;

    res.redirect(`http://localhost:3000/noresults?access_token=${accessToken}`);
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).send("Error retrieving access token");
  }
});

const DATABASE_URL = process.env.MONGODB_URL;

// connection to MongoDB
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
