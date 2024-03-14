const { createBill } = require("./creatBillPDF");

const bill = {
  _id: "65ed6dd44612fd2d9cd5f574",
  buyer: {
    name: "Loli Chans",
    email: "hiepnt1@funix.edu.vn",
    phone: "hiepnt1@funix.edu.vn",
    receiver: {
      name: "Điêu Huynh",
      phone: "(+84) 258963214",
      address: "Xã Bằng Lãng, Huyện Chợ Đồn, Tỉnh Bắc Kạn",
      detail: "khuynh thành thế gia",
    },
  },
  products: [
    {
      _id: "65e34b28afab92e6a45ab366",
      name: "Mizuno Morelia Neo III Pro AS - P1GD238452 - Vàng Trắng",
      actualPrice: "2.150.000",
      img: "http://res.cloudinary.com/dmwl0pu3j/image/upload/v1709394727/upload/ncyzlztf1deogba5f5up.jpg",
      oldPrice: "3.050.000",
      quantity: 1,
      stock: "25",
      size: "39",
    },
    {
      _id: "65e34b28afab92e6a45ab366",
      name: "Mizuno Morelia Neo III Pro AS - P1GD238452 - Vàng Trắng",
      actualPrice: "2.150.000",
      img: "http://res.cloudinary.com/dmwl0pu3j/image/upload/v1709394727/upload/ncyzlztf1deogba5f5up.jpg",
      oldPrice: "3.050.000",
      quantity: 3,
      stock: "25",
      size: " 43",
    },
  ],
  payment_method: "card",
  total: 8630000,
  status: true,
  createdAt: "2024-03-10T08:22:44.659Z",
  updatedAt: "2024-03-10T08:22:44.659Z",
  __v: 0,
};

createBill(bill, "bill.pdf");
console.log("first");
