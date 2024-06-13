const express = require("express");
const authController = require("../../controller/user/auth.controller");
const authRoute = express.Router();
const passport = require("passport");
const verifyToken = require("../../utils/verifyToken");
const jwt = require("jsonwebtoken");

// by
authRoute.post("/register", authController.register);
authRoute.post(
  "/activation/:activation_token",
  authController.activationAccount,
);
authRoute.post("/login", authController.login);
authRoute.post("/signUp", authController.signUp);
authRoute.post("/verify", authController.verifyOtp);

// login gg
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  }),
);

authRoute.get("/login/sucess", (req, res) => {
  if (req.user) {
    console.log(req.user);
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "successfull",
        user: req.user,
      });
  }
});

authRoute.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRoute.get("/logout", (req, res) => {
  req.logOut();
  res.cookie("token", null).redirect("http://localhost:3000");
});

module.exports = authRoute;
