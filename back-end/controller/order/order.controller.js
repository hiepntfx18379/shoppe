const ErrorHandler = require("../../utils/ErrorHandler");
const orderModel = require("../../model/order.model");
const userModel = require("../../model/user.model");
const sendEmail = require("../../utils/sendEmail");
const loadInfo = require("./loadInfo");
const stripe = require("stripe")(
  "sk_test_51OrjgR01xya3lYTPErSBh9lYevM2Vk2nCfdjl6Smja5qYxOx5s2UWuTRm8NqUwgnC0FtxY3ZUUVYYPwIAVnpzy9B00hOqCHVVF",
);
const { createBill } = require("./creatBillPDF");

const sendBill = async (req, res, next) => {
  try {
    const { order } = req.body;
    const email = order.buyer.email;
    const filename = `Bill${order._id}.pdf`;

    createBill(order, filename);

    const user = await userModel.findOne({ email });
    if (!user) return next(new ErrorHandler("Email not found", 400));
    const listOrder = order.products;

    const list = listOrder.map((item) => {
      return {
        name: item.name,
        size: item.size,
        price: item.actualPrice,
        img: item.img,
        quantity: item.quantity,
      };
    });

    const info = {
      order,
      products: list,
    };

    const output = loadInfo(info);

    try {
      await sendEmail({
        email: email,
        subject: "Check your order",
        message: `Hello , Check your history purchase`,
        temp: output,
        filename,
      });

      res.status(200).json({ message: "Bill has sent to your email!!!" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// for dashboard admin page
const getAllOrder = async (req, res) => {
  const allOrder = await orderModel.find();
  res.status(200).json(allOrder);
};

const getOrderUser = async (req, res) => {
  try {
    const { email } = req.body;
    const orderOfUser = await orderModel.find({ "buyer.email": email });
    res.status(200).json({
      messafe: "Lấy danh sách đơn hàng thành công",
      orders: orderOfUser,
    });
  } catch {}
};

const checkoutCard = async (req, res) => {
  try {
    const { products, infoBuyer } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: product.name,
          images: [product.img.replace("webp", "jpg")],
        },
        unit_amount: Math.round(
          Number(product.actualPrice.replaceAll(".", "")),
        ),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/profile/purchase",
    });

    const total = products.reduce(
      (accumulator, currentValue) =>
        accumulator +
        Number(currentValue.actualPrice.replaceAll(".", "")) *
          currentValue.quantity,
      30000,
    );

    const billCustomer = new orderModel({
      buyer: infoBuyer,
      products,
      payment_method: "card",
      total,
      status: true,
    });

    await billCustomer.save();

    res.status(200).json({
      id: session.id,
    });
  } catch {}
};

const checkoutCod = async (req, res) => {
  try {
    const { products, infoBuyer } = req.body;

    const total = products.reduce(
      (accumulator, currentValue) =>
        accumulator +
        Number(currentValue.actualPrice.replaceAll(".", "")) *
          currentValue.quantity,
      30000,
    );

    const billCustomer = new orderModel({
      buyer: infoBuyer,
      products,
      total,
      status: false,
    });

    await billCustomer.save();

    res.status(200).json({
      message: "Đặt hàng thành công!!!",
    });
  } catch {
    res.status(400).json({
      message: "Lỗi đặt hàng, vui lòng đặt lại!!!",
    });
  }
};

module.exports = {
  getAllOrder,
  getOrderUser,
  sendBill,
  checkoutCard,
  checkoutCod,
};
