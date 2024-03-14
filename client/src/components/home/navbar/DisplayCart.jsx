import React from "react";
import DisplayCartItem from "./DisplayCartItem";
import { IoTriangleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const DisplayCart = ({ productsCart }) => {
  return (
    <>
      <div className="w-[400px] bg-white border border-outline shadow-lg mt-3 relative">
        <div className="">
          <IoTriangleSharp className=" absolute -top-[12px] right-3 " />
          <span className="text-[#929292] p-3 text-lg">Sản phẩm mới thêm</span>
        </div>
        {productsCart.slice(0, 5).map((pro) => (
          <DisplayCartItem item={pro} />
        ))}
        <div className="flex items-center p-3 justify-between">
          {productsCart.length - 5 > 0 ? (
            <span className="text-black  text-base ">
              {productsCart.length - 5} hàng thêm vào giỏ
            </span>
          ) : (
            <span>""</span>
          )}

          <button className="bg-main text-white px-4 py-2">
            <Link to="/cart">Xem Giỏ Hàng</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayCart;
