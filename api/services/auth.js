const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
  const token = req.headers["authorization"]?.split("")[1];

  if (!token)
    return res.status(403).send("A token is requried for authentification");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid Token");
    req.user = decoded;
  });
};

module.exports = { verifyToken };
