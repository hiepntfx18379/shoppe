const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const userModel = require("../model/user.model");
const sendToken = require("./sendToken");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "146184006761-ef31nhcbr52jnrtutiv28la59iobueu6.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done, req, res) {
      try {
        if (profile.id) {
          userModel
            .findOne({
              googleId: profile.id,
            })
            .then(async (existsUser) => {
              if (existsUser) {
                done(null, existsUser);
              } else {
                new userModel({
                  googleId: profile.id,
                  email: profile.emails[0].value,
                  name: profile.displayName,
                  password: "1234",
                })
                  .save()
                  .then((user) => {
                    done(null, user);
                  });
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
  ),
);

// ban chat 2 func: generate ra một đoạn mã nào đó (token) sau đó biên dịch ra (decoded) để xác thực người dùng.
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  userModel.findOne({ googleId: id }).then((user) => {
    done(null, user);
  });
});
