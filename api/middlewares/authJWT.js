const jwt = require("jsonwebtoken");
const JWTModel = require("../models/jwtSchema");

const authJWT = async (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

  const tokenRecord = await JWTModel.findOne({ token });
  if (!tokenRecord) {
    return res.status(401).send("Unauthorized: Token not found");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Token is not valid");
    }
    req.user = user;
    next();
  });
};

module.exports = authJWT;
