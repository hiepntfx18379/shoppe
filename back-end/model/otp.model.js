const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OtpSchema = new Schema(
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

const OtpModel = mongoose.model("OTP", OtpSchema);
module.exports = OtpModel;
