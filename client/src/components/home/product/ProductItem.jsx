import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ item }) => {
  return (
    <Link
      title={`${item.title}`}
      to={`/detail/${item._id}`}
      className=" hover:cursor-pointer text-center my-3 border hover:shadow-2xl  bg-white hover:border hover:border-[#ee4d2d]"
    >
      <div className="mb-2">
        <img src={item?.album[0]} alt="" width="100%" />
      </div>
      <div className="text-[16px] font-bold">{item?.brand}</div>
      <div className=" text-[12px]">{item?.title}</div>
      <div className="text-[12px] font-semibold">
        {item?.list_size.join(", ")}
      </div>
      <div className="flex gap-3 justify-center mb-3">
        <span className=" line-through">{item?.oldPrice}₫</span>
        <span className="text-[#ee4d2d]">{item?.actualPrice}₫</span>
      </div>
    </Link>
  );
};

export default ProductItem;
