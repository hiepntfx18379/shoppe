import React from "react";
import { FaCheckDouble } from "react-icons/fa";

const AddCard = () => {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-[500]">
        <div className="relative w-auto mx-auto max-w-3xl">
          <div className="relative items-center justify-center flex-col">
            <FaCheckDouble className=" w-[100px] h-[100px] m-auto  text-[#00bfa5]" />

            <span className="text-white text-xl">
              Sản phẩm đã được thêm vào Giỏ hàng
            </span>
          </div>
        </div>
      </div>
      <div className="opacity-40 w-[30%] h-[30%] m-auto fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default AddCard;
