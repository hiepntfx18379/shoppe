const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const catchAsyncError = require("./catchAsyncError");

const authenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please login again" });

  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userModel.findById(user.id);
  next();
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please login again" });

  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (user.data?.role === "admin") next();
  else next(new ErrorHandler("You not allow", 403));
};

exports.verifyAdmin = verifyAdmin;
exports.authenticated = authenticated;
