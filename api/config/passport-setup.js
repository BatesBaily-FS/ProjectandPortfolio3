const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../models/users");
const dotenv = require("dotenv");

dotenv.config();

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const existingUser = await User.findOne({ spotifyId: profile.id });

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({
          spotifyId: profile.id,
          displayName: profile.id,
          email: profile.email,
          profileImage: profile._json.image[0].url,
        }).save();
        done(null, newUser);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
