const productModel = require("../../model/product.model");

const createProduct = async (req, res, next) => {
  try {
    const infoPro = req.body;
    const newProduct = new productModel(infoPro);
    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (err) {
    return res.status(400).json({ message: "Field not empty" });
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await productModel.find();
    res.status(200).json(allProduct);
  } catch (err) {
    next(err);
  }
};

const findProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).json(product);
};

const updateProduct = async (req, res, next) => {
  const newInfo = req.body;
  const updateProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    newInfo,
  );
  await updateProduct.save();
  res.status(200).json(updateProduct);
};

const deleteOneOrMany = async (req, res, next) => {
  const oldProduct = await productModel.findByIdAndDelete(req.params.id);
  res.status(200).json(oldProduct);
};

const deleteAll = async (req, res, next) => {
  const allProduct = await productModel.deleteMany({});
  res
    .status(200)
    .json({ products: allProduct, message: "All records have deleted" });
};

const updateQuantity = async (req, res) => {
  const { quantity } = req.query;
  const product = await productModel.findById(req.params.id);
  product.stock = product.stock - Number(quantity);

  await product.save();
  res.status(200).json({ success: true });
};

module.exports = {
  createProduct,
  getAllProduct,
  findProduct,
  updateProduct,
  deleteOneOrMany,
  updateQuantity,
  deleteAll,
};
