const express = require("express");
const orderController = require("../../controller/order/order.controller");
const routeOrder = express.Router();

routeOrder.get("/", orderController.getAllOrder);
routeOrder.post("/sendBill", orderController.sendBill);
routeOrder.post("/orderUser", orderController.getOrderUser);
routeOrder.post("/create-checkout-session", orderController.checkoutCard);
routeOrder.post("/checkoutCod", orderController.checkoutCod);

module.exports = routeOrder;
