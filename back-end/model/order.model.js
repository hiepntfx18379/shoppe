const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    buyer: {
      type: {},
      required: true,
    },
    products: {
      type: [Object],
      require: true,
    },
    payment_method: {
      type: String,
      required: true,
      default: "cod",
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
