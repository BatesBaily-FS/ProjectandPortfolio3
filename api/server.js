const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const loginRouter = require("./routes/loginRoutes");
const registerRouter = require("./routes/registerRoutes");
const spotifyRouter = require("./routes/spotifyRoutes");

app.use(cors());
app.use(express.json());

const DATABASE_URL = process.env.MONGODB_URL;

// connection to MongoDB
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

app.use("/api/v1", loginRouter);
app.use("/api/v1", registerRouter);
app.use("/api/v1/spotify", spotifyRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
