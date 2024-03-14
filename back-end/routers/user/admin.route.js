const express = require("express");
const adminController = require("../../controller/user/admin.controller");
const { verifyAdmin } = require("../../middleware/auth");
const adminRoute = express.Router();

adminRoute.post("/login", adminController.login);
adminRoute.post("/create-user", adminController.registerByAdmin);

module.exports = adminRoute;
