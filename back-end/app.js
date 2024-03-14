const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const route = require("./routers/index.route");
const error = require("./middleware/error");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./utils/passport");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use(fileUpload({ useTempFiles: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["shoppe"],
    maxAge: 24 * 60 * 60 * 100,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(error);

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// routes
route(app);

module.exports = app;
