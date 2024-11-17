const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoutes");
const spotifyRouter = require("./routes/spotify");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

console.log("PORT", process.env.PORT);
console.log("SPOTIFY_CLIENT_ID", process.env.SPOTIFY_CLIENT_ID);
console.log("SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);
console.log("REDIRECT_URI:", process.env.REDIRECT_URI);

const app = express();
const PORT = process.env.PORT || 8888;

const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://git.heroku.com/projectportfolio3.git/auth/callback"
    : "http://localhost:8888/auth/callback";

// Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Welcome to Login page");
});

app.get("/noresults", (req, res) => {
  res.send("This is the no results page.");
});

// Routes
app.use("/auth", authRouter);
app.use("/api", spotifyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
