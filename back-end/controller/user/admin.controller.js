const userModel = require("../../model/user.model");
const jwt = require("jsonwebtoken");

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
      .select("name password email avatar role");
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

    const { role, ...otherDetail } = user._doc;

    // return token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.role === "admin" ? true : false,
      },
      process.env.JWT_SECRET_KEY,
    );

    res
      .cookie("token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        details: { ...otherDetail, role },
        role,
      });
  } catch (err) {
    next(err);
  }
};

const registerByAdmin = async (req, res) => {
  try {
    const { email, ...info } = req.body;
    const userEmail = await userModel.findOne({ email });
    if (userEmail) return next(new ErrorHandler("User already exists", 400));

    const user = new userModel({ email, ...info });

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { login, registerByAdmin };
