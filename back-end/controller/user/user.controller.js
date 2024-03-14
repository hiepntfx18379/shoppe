const ErrorHandler = require("../../utils/ErrorHandler");
const userModel = require("../../model/user.model");
const sendEmail = require("../../utils/sendEmail");
const sendToken = require("../../utils/sendToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "1h",
  });
};

const getAllUser = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) res.status(400).json({ message: "User doesn't exist" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      user: null,
      message: "Logout successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return next(new ErrorHandler("Email not found", 400));

    const userFound = {
      id: user._id,
      email: user.email,
    };

    const activationToken = createActivationToken(userFound); // new token
    const activationUrl = `http://localhost:3000/resetPassword/${activationToken}`;

    try {
      await sendEmail({
        email: userFound.email,
        subject: "Reset your password",
        message: `Hello ${userFound.email}, please click on the link to reset your password: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email to reset password`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { activation_token } = req.params;
    const emailUser = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET,
    );
    const newPass = req.body;
    newPass.password = await bcrypt.hash(newPass.password, 10);
    const user = await userModel.findByIdAndUpdate(emailUser.id, newPass);
    await user.save();
    sendToken(user, 201, res, "Reset password successfully");
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const changePassword = async (req, res, next) => {
  try {
    let { pwd } = req.body;
    const newPassword = await bcrypt.hash(pwd, 10);
    const user = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { password: newPassword },
    );

    await user.save();

    res
      .status(200)
      .cookie("token", null)
      .json({ message: "Update password successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateInfo = async (req, res) => {
  try {
    const { name, email, phone, receiver } = req.body;

    const user = await userModel.findOneAndUpdate(
      { email },
      {
        name,
        email,
        phone,
        receiver,
      },
    );

    await user.save();
    res.status(200).json({ user, message: "Update info successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something wrong" });
  }
};

const deleteOneOrMany = async (req, res, next) => {
  const oldProduct = await userModel.findByIdAndDelete(req.params.id);
  res.status(200).json(oldProduct);
};

const deleteAll = async (req, res, next) => {
  const allProduct = await userModel.deleteMany({ role: "user" });
  res
    .status(200)
    .json({ products: allProduct, message: "All users have deleted" });
};

const findUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.status(200).json(user);
};

const confirmPass = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select("name password role");
    const { password } = req.body;

    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid) {
      if (user.role === "admin") {
        user.role = "user";
        await user.save();
      } else {
        user.role = "admin";
        await user.save();
      }
      res.status(200).json({ message: "Change role successfully" });
    } else {
      res.status(400).json({ message: "Password is wrong, please again" });
    }
  } catch (e) {}
};

const receiver = async (req, res) => {
  try {
    const { email, infoReceiver } = req.body;
    const user = await userModel
      .findOne({ email })
      .select("_id, name, phone, email, receiver");
    user.receiver = infoReceiver;
    await user.save();
    res
      .status(200)
      .json({ user, message: "Thêm địa chỉ nhận hàng thành công" });
  } catch {
    res.status(400).json({ message: "Something is wrong" });
  }
};

const verifyOldPwd = async (req, res) => {
  try {
    const { oldPwd } = req.body;

    const user = await userModel
      .findOne({ _id: req.user.id })
      .select("name email phone password receiver");

    const isPasswordValid = await user.comparePassword(oldPwd);

    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Password is wrong, please try again" });

    return res.status(200).json({ message: "Password is right" });
  } catch (err) {
    res.status(400).json({ message: "Password is wrong" });
  }
};

module.exports = {
  getUser,
  getAllUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  updateInfo,
  deleteOneOrMany,
  deleteAll,
  findUser,
  confirmPass,
  receiver,
  verifyOldPwd,
};
