const productModel = require("../../model/product.model");

const createProduct = async (req, res, next) => {
  try {
    const {
      actualPrice,
      brand,
      oldPrice,
      stock,
      title,
      list_size,
      album,
      short_desc,
      long_desc,
    } = req.body;

    const listInput = [
      {
        field: "Sale",
        value: actualPrice,
      },
      {
        field: "Price",
        value: oldPrice,
      },

      {
        field: "Images",
        value: album,
      },
      {
        field: "Brand",
        value: brand,
      },
      {
        field: "List Size",
        value: list_size,
      },
      {
        field: "Long Desc",
        value: long_desc,
      },
      {
        field: "Old Price",
        value: oldPrice,
      },
      {
        field: "Short Desc",
        value: short_desc,
      },
      {
        field: "Stock",
        value: stock,
      },
      {
        field: "Name",
        value: title,
      },
    ];

    for (let input of listInput) {
      if (
        input.value === undefined ||
        (input.value.length === 1 && input.value[0] === "") ||
        input.value.length === 0
      ) {
        return res.status(400).json({
          message: `${input.field} not empty, please check again`,
        });
      }
    }

    const newPro = req.body;
    const newProduct = new productModel(newPro);
    await newProduct.save();

    res.status(200).json({ message: "Add Product successfully", status: true });
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
  try {
    const {
      actualPrice,
      brand,
      oldPrice,
      stock,
      title,
      list_size,
      album,
      short_desc,
      long_desc,
    } = req.body;

    const listInput = [
      {
        field: "Sale",
        value: actualPrice,
      },
      {
        field: "Price",
        value: oldPrice,
      },

      {
        field: "Images",
        value: album,
      },
      {
        field: "Brand",
        value: brand,
      },
      {
        field: "List Size",
        value: list_size,
      },
      {
        field: "Long Desc",
        value: long_desc,
      },
      {
        field: "Old Price",
        value: oldPrice,
      },
      {
        field: "Short Desc",
        value: short_desc,
      },
      {
        field: "Stock",
        value: stock,
      },
      {
        field: "Name",
        value: title,
      },
    ];

    for (let input of listInput) {
      if (
        input.value === "" ||
        (input.value.length === 1 && input.value[0] === "") ||
        input.value.length === 0
      ) {
        return res.status(400).json({
          message: `${input.field} not empty, please check again`,
        });
      }
    }
    const newInfo = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      newInfo,
    );
    await updateProduct.save();
    res
      .status(200)
      .json({ status: true, updateProduct, message: "Update successfully" });
  } catch {
    res.status(400).json({ message: "Something is wrong" });
  }
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
