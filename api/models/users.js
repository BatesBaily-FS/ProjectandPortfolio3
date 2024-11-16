const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true },
  displayName: { type: String },
  email: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
