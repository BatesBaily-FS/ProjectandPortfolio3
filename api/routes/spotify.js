const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/login",
  passport.authenticate("spotify", {
    scope: ["user-read-private", "user-read-email"],
    showDialog: true,
  })
);

router.get(
  "/callback",
  passport.authenticate("spotify", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/noresults");
  }
);
