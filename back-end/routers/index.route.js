const userRoute = require("./user/user.route");
const adminRoute = require("./user/admin.route");
const productRoute = require("./product/products.route");
const routeOrder = require("./order/order.route");
const authRoute = require("./user/auth.route");

module.exports = function route(app) {
  app.use("/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/admin", adminRoute);
  app.use("/api/product", productRoute);
  app.use("/api/order", routeOrder);
};
