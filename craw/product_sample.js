const products = [
  {
    title:
      "Nike Zoom Mercurial Vapor 15 Academy XXV TF - Bạc/Xanh Lá - FB8396-060",
    brand: "Nike",
    list_size: [
      "38.5",
      "39",
      "40",
      "40.5",
      "41",
      "42",
      "42.5",
      "43",
      "44",
      "44 .5",
      "45",
    ],
    oldPrice: "Giá cũ: 2.600.000 ₫",
    actualPrice: "1.399.000",
  },
  {
    title:
      "Nike Zoom Mercurial Vapor 15 Academy TF - Trắng/Đen/Đỏ - DJ5635-600",
    brand: "Nike",
    list_size: ["39", "40", "40.5", "41", "42", "44", "45"],
    oldPrice: "Giá cũ: 2.600.000 ₫",
    actualPrice: "1.599.000",
  },
  {
    title:
      "Nike Zoom Mercurial Vapor 15 Academy TF Luminous - Hồng/Xanh - DJ5635-605",
    brand: "Nike",
    list_size: ["40", "40.5", "41", "42", "42.5", "43", "44", "44 .5"],
    oldPrice: "Giá cũ: 2.600.000 ₫",
    actualPrice: "1.599.000",
  },
  {
    title:
      "Nike Air Zoom Mercurial Vapor 15 Academy TF Generation - DR5949-810 - World Cup",
    brand: "Nike",
    list_size: ["39", "40", "40.5", "41", "42.5", "43"],
    oldPrice: "Giá cũ: 2.600.000 ₫",
    actualPrice: "1.499.000",
  },
  {
    title:
      "Nike Zoom Mercurial Vapor 15 Academy TF - Xanh Lơ/ Tím - DJ5635-300",
    brand: "Nike",
    list_size: ["39", "40", "40.5", "42.5", "43"],
    oldPrice: "Giá cũ: 2.600.000 ₫",
    actualPrice: "1.599.000",
  },
  {
    title:
      "Nike Zoom Mercurial Vapor 15 Academy TF Lemonde - Màu Trà Sữa - DJ5635-700",
    brand: "Nike",
    list_size: ["40.5"],
    oldPrice: "Giá cũ: 2.600.000 ₫",
    actualPrice: "1.850.000",
  },
  {
    title: "Nike Phantom GX Academy DF TF - Đỏ/Đen - DD9476-600",
    brand: "Nike",
    list_size: ["39", "40", "40.5", "41", "43", "44", "44 .5"],
    oldPrice: "Giá cũ: 2.969.000 ₫",
    actualPrice: "1.999.000",
  },
  {
    title: "Adidas X Speedflow .1 TF Meteorite - Đỏ/Trắng - FY3280",
    brand: "Adidas",
    list_size: ["39 1/3", "40", "41 1/3", "42", "42 2/3", "43 1/3", "44"],
    oldPrice: "Giá cũ: 3.500.000 ₫",
    actualPrice: "1.699.000",
  },
  {
    title:
      "adidas Predator Accuracy .1 TF Marine Rush - Xanh Dương/Trắng - GZ0008",
    brand: "Adidas",
    list_size: [
      "39 1/3",
      "40",
      "40 2/3",
      "41 1/3",
      "42",
      "42 2/3",
      "43 1/3",
      "44",
    ],
    oldPrice: "Giá cũ: 3.500.000 ₫",
    actualPrice: "2.450.000",
  },
  {
    title: "adidas Predator Accuracy .1 TF Crazyrush - Xanh/Trắng - GZ0009",
    brand: "Adidas",
    list_size: ["39 1/3", "40", "41 1/3", "42"],
    oldPrice: "Giá cũ: 3.500.000 ₫",
    actualPrice: "2.350.000",
  },
  {
    title: "adidas X Speedportal.1 TF Own Your Football - Hồng Đen - GZ2440",
    brand: "Adidas",
    list_size: ["40", "42 2/3", "43 1/3", "44"],
    oldPrice: "Giá cũ: 3.600.000 ₫",
    actualPrice: "2.150.000",
  },
  {
    title: "Adidas X Speedportal .1 TF Game Data - Xanh Lá - GW8973",
    brand: "Adidas",
    list_size: ["43 1/3"],
    oldPrice: "Giá cũ: 3.600.000 ₫",
    actualPrice: "2.180.000",
  },
  {
    title: "PUMA Ultra Match TT Fastest - Xanh Mạ Non - 106903 01",
    brand: "Puma",
    list_size: ["39", "41", "42.5", "43", "44"],
    oldPrice: "Giá cũ: 2.590.000 ₫",
    actualPrice: "1.200.000",
  },
  {
    title: "PUMA Future Ultimate Cage TT Supercharge - Xanh/Cam - 107174 01",
    brand: "Puma",
    list_size: ["40.5"],
    oldPrice: "Giá cũ: 3.099.000 ₫",
    actualPrice: "2.300.000",
  },
  {
    title: "PUMA Future Match TT Breakthrough - Trắng/Hồng - 107374 01",
    brand: "Puma",
    list_size: ["42.5", "44.5", "45"],
    oldPrice: "Giá cũ: 2.399.000 ₫",
    actualPrice: "1.200.000",
  },
  {
    title: "PUMA Future Ultimate Cage TT Gear Up - Xanh Than - 107374 03",
    brand: "Puma",
    list_size: ["42.5"],
    oldPrice: "Giá cũ: 3.099.000 ₫",
    actualPrice: "2.300.000",
  },
  {
    title: "BỘ QUẦN ÁO BÓNG ĐÁ DRAHA SANTAFE MÀU VÀNG",
    brand: "",
    list_size: ["S", "M", "L", "XL"],
    oldPrice: "Giá cũ: 199.000 ₫",
    actualPrice: "179.000",
  },
  {
    title: "BỘ QUẦN ÁO BÓNG ĐÁ LIVERPOOL MÀU VÀNG",
    brand: "",
    list_size: ["S", "M", "L", "XL", "XXL"],
    oldPrice: "Giá cũ: 220.000 ₫",
    actualPrice: "180.000",
  },
  {
    title: "Quần body giữ nhiệt Wika - Màu Đen co dãn 4 chiều",
    brand: "",
    list_size: ["M", "L", "XL"],
    oldPrice: "Giá cũ: 139.000 ₫",
    actualPrice: "129.000",
  },
  {
    title: "Jogarbola Colorlux Ultra 2.0 Xanh Ngọc/Vàng",
    brand: "JOGARBOLA",
    list_size: ["39", "40", "41", "43", "44"],
    oldPrice: "Giá cũ: 710.000 ₫",
    actualPrice: "569.000",
  },
  {
    title: "Jogarbola Colorlux Ultra 2.0 Xanh Navy/Đỏ",
    brand: "JOGARBOLA",
    list_size: ["41", "44"],
    oldPrice: "Giá cũ: 710.000 ₫",
    actualPrice: "569.000",
  },
  {
    title: "Jogarbola Colorlux Ultra 2.0 Trắng/Vàng/Xanh",
    brand: "JOGARBOLA",
    list_size: ["40"],
    oldPrice: "Giá cũ: 699.000 ₫",
    actualPrice: "569.000",
  },
  {
    title: "Jogarbola Koha 2103 - Màu Ghi",
    brand: "JOGARBOLA",
    list_size: ["38", "44"],
    oldPrice: "Giá cũ: 710.000 ₫",
    actualPrice: "550.000",
  },
  {
    title: "Jogarbola Koha 2103 - Màu Xanh Ngọc",
    brand: "JOGARBOLA",
    list_size: ["39", "44"],
    oldPrice: "Giá cũ: 710.000 ₫",
    actualPrice: "550.000",
  },
  {
    title: "Kamito QH19 Màu Tím Trắng",
    brand: "Kamito",
    list_size: ["38", "39", "40", "41", "42"],
    oldPrice: "Giá cũ: 555.000 ₫",
    actualPrice: "290.000",
  },
  {
    title: "Kamito QH19 màu trắng đỏ",
    brand: "Kamito",
    list_size: ["40", "41"],
    oldPrice: "Giá cũ: 555.000 ₫",
    actualPrice: "290.000",
  },
  {
    title: "Kamito QH19 Màu Trắng Vàng",
    brand: "Kamito",
    list_size: ["41"],
    oldPrice: "Giá cũ: 555.000 ₫",
    actualPrice: "290.000",
  },
];

const sizes = ["38", "40", "42"];
const brands = ["Adidas"];
let listAfter = [];
/*
if (sizes.length > 0) {
  for (let pro of products) {
    for (let size of sizes) {
      if (pro.list_size.includes(size)) {
        listAfter.push(pro);
        break;
      } else {
        continue;
      }
    }
  }
}
if (brands.length > 0) {
  for (let pro of listAfter) {
    for (let brand of brands) {
      if (pro.brand === brand) {
        listAfter.push(pro);
        break;
      } else {
        continue;
      }
    }
  }
}
*/

let arange = [
  { sizes: "sizes", value: sizes.length },
  { brands: "brands", value: brands.length },
];

console.log(Object.keys(arange[0])[0]);
