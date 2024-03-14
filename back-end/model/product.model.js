const mongose = require("mongoose");

const productSchema = new mongose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your product name"],
    },
    brand: {
      type: String,
      required: [true, "Please enter brand of product "],
    },
    long_desc: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    short_desc: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Please enter your product category!"],
    },
    oldPrice: {
      type: String,
      required: [true, "Please enter your product price!"],
    },
    actualPrice: {
      type: String,
    },
    flashSale: {
      type: Boolean,
    },
    reviews: [Object],
    list_size: [String],
    stock: {
      type: String,
      required: [true, "Please enter your product stock!"],
    },
    album: [String],
  },
  { timestamps: true },
);

const productsModel = mongose.model("Product", productSchema);
module.exports = productsModel;
