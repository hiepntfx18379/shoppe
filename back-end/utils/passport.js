const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const userModel = require("../model/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "146184006761-ef31nhcbr52jnrtutiv28la59iobueu6.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
