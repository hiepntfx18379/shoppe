const express = require("express");
const productController = require("../../controller/product/product.controller");
const routeProduct = express.Router();

routeProduct.get("/", productController.getAllProduct);
routeProduct.post("/create-product", productController.createProduct);
routeProduct.patch("/update/:id", productController.updateProduct);
routeProduct.delete("/deleteOneOrMany/:id", productController.deleteOneOrMany);
routeProduct.get("/find/:id", productController.findProduct);
routeProduct.patch("/updateQuantity/:id", productController.updateQuantity);
routeProduct.delete("/deleteAll", productController.deleteAll);

module.exports = routeProduct;
