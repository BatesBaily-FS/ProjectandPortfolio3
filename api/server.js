const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const spotifyRouter = require("./routes/spotifyRoutes");

app.use(cors());

// connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

app.use(express.json());
app.use("/api/v1/login", spotifyRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
