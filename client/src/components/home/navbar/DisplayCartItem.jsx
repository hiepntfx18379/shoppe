import React from "react";

const DisplayCartItem = ({ item }) => {
  return (
    <div className="flex flex-row gap-1 items-center justify-between hover:bg-[#f8f8f8] ">
      <div className="flex justify-between items-center gap-3 p-3">
        <img src={item.img} alt="" className="w-[42px] h-[42px] border   " />
        <span className=" text-ellipsis text-base overflow-hidden whitespace-nowrap w-[250px] text-black">
          {item.name}
        </span>
      </div>
      <span className="text-main mr-4 text-base">₫{item.actualPrice}</span>
    </div>
  );
};

export default DisplayCartItem;
