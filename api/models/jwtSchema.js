const mongoose = require("mongoose");

const jwtSchema = new mongoose.Schema({
  token: { type: String, required: true },
  refreshToken: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const JWT = mongoose.model("JWT", jwtSchema);
module.exports = JWT;
