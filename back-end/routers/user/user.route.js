const express = require("express");
const userController = require("../../controller/user/user.controller");
const { authenticated } = require("../../middleware/auth");
const verifyToken = require("../../utils/verifyToken");

const userRoute = express.Router({ mergeParams: true });

// user
userRoute.get("/", userController.getAllUser);
userRoute.post("/forgotPassword", userController.forgotPassword);
userRoute.patch(
  "/resetPassword/:activation_token",
  userController.resetPassword,
);
userRoute.get("/getUser", verifyToken, userController.getUser);
userRoute.patch("/changePassword", verifyToken, userController.changePassword);
userRoute.patch("/updateInfo", userController.updateInfo);
userRoute.delete("/deleteOneOrMany/:id", userController.deleteOneOrMany);
userRoute.delete("/deleteAll", userController.deleteAll);
userRoute.get("/logout", authenticated, userController.logout);
userRoute.get("/find/:id", userController.findUser);
userRoute.post("/confirmPass/:id", verifyToken, userController.confirmPass);
userRoute.patch("/receiver", userController.receiver);
userRoute.post("/verifyOldPwd", verifyToken, userController.verifyOldPwd);
userRoute.post("/addtoCard", verifyToken, userController.addtoCard);
userRoute.post("/deleteproduct", verifyToken, userController.deletePro);
userRoute.patch("/increQuantity", verifyToken, userController.increPro);
userRoute.patch("/decreQuantity", verifyToken, userController.decrePro);

module.exports = userRoute;
