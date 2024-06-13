const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plese enter your name"],
    },
    email: {
      type: String,
      required: [true, "Plese enter your email"],
    },
    password: {
      type: String,
      required: [true, "Plese enter your password"],
      minLength: [4, "Password should be greater than 4 chacracters"],
      select: false,
    },
    avatar: {
      type: String,
    },
    receiver: {
      type: Object,
      default: {
        name: "",
        phone: "",
        address: "",
        detail: "",
      },
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "sale"],
    },
    googleId: {
      type: String,
    },
    cardList: [Object],
  },
  { timestamps: true },
);

// hashed pasword
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

//jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
