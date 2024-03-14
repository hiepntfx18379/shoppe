const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TransitionSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 300 }, // after 5min auto del from db
    },
  },
  { timestamps: true },
);

const TransitionModel = mongoose.model("Transitionss", TransitionSchema);
module.exports = TransitionModel;
