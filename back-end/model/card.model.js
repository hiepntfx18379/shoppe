const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const cardSchema = new Schema(
  {
    userId: {
      type: {},
      required: true,
    },
  },
  { timestamps: true },
);

const cardModel = mongoose.model("Card", cardSchema);

module.exports = cardModel;
