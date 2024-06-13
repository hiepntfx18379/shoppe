const ErrorHandler = require("../../utils/ErrorHandler");
const userModel = require("../../model/user.model");
const sendEmail = require("../../utils/sendEmail");
const sendToken = require("../../utils/sendToken");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const OtpModel = require("../../model/otp.model");
const bcrypt = require("bcrypt");
const Nexmo = require("nexmo");
const _ = require("lodash");

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "1h",
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const userEmail = await userModel.findOne({ email });
    if (userEmail) return next(new ErrorHandler("User already exists", 400));
    const newUser = {
      name,
      email,
      password,
      phone,
    };
    try {
      await sendEmail({
        email: newUser.email,
        subject: "Activate your account successfully",
        message: `Registration, please Login`,
      });

      const user = new userModel(newUser);
      await user.save();
      sendToken(user, 201, res, "Registration sucessfully");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const activationAccount = async (req, res, next) => {
  try {
    const { activation_token } = req.params;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return;
    }

    const { name, email, password, avatar } = newUser;

    const user = new userModel({
      name,
      email,
      password,
      avatar,
    });

    await user.save();
    sendToken(user, 201, res, "Account actived");
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password not empty, please try again" });
    }

    const user = await userModel
      .findOne({ email })
      .select("id name email phone password receiver avatar cardList");

    if (!user) {
      return res
        .status(400)
        .json({ message: "User isn't exist, please sign-up" });
    }
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Email or password is wrong, please try again" });

    sendToken(user, 200, res, "Login sucessfully");
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//send sms
const nexmo = new Nexmo({
  apiKey: "c0e88ab7",
  apiSecret: "PsKOLU320lNsYXCH",
});
function sendSMS(fromPhone, toPhone, content, callback) {
  nexmo.message.sendSms(
    fromPhone,
    toPhone,
    content,
    {
      type: "unicode",
    },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          callback("Message sent successfully.");
        } else {
          callback(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`,
          );
        }
      }
    },
  );
}

const signUp = async (req, res) => {
  try {
    const { phone } = req.body;
    // const user = await userModel.findOne({
    //   phone,
    // });

    // if (user)
    //   return res.status(400).json({
    //     message: "Phone number already registered",
    //   });

    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // const phoneNumber = "+84" + phone.substring(1);
    // sendSMS("0978886345", phoneNumber, OTP, function (responseData) {
    //   console.log(responseData);
    // });
    console.log(OTP);

    const salt = await bcrypt.genSalt(10);
    const optHash = await bcrypt.hash(OTP, salt);
    const otp = new OtpModel({ phone: "0386132323", otp: optHash });
    await otp.save();
    res.status(200).json({ message: "Otp send successfully" });
  } catch (err) {
    console.log(err);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, phone } = req.body;
    const otpHoder = await OtpModel.find({
      phone,
    });

    if (otpHoder.length === 0)
      return res.status(400).json({ message: "You has a expired OTP!!!" });
    const rightOtpHoder = otpHoder[otpHoder.length - 1];
    const validUser = await bcrypt.compare(otp, rightOtpHoder.otp);

    if (rightOtpHoder.phone === phone && validUser) {
      const otpDel = await OtpModel.deleteMany({ phone: rightOtpHoder.phone });
      return res.status(200).json({
        message: "OTP Code matched",
      });
    } else {
      return res.status(400).json({ message: "Your Otp is wrong" });
    }
  } catch {}
};

module.exports = {
  register,
  activationAccount,
  login,
  signUp,
  verifyOtp,
};
