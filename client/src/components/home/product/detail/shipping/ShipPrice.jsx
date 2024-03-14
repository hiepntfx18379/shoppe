import React from "react";

const ShipPrice = () => {
  const date = new Date();
  const dateTo = new Date();
  dateTo.setDate(date.getDate() + 2);
  return (
    <div className="border border-[#757575]">
      <div className="flex flex-col p-4 w-[380px] gap-3">
        <div className="flex justify-between items-center ">
          <span>Nhanh</span>
          <span>₫ 32.500</span>
        </div>
        <div className=" -mt-2">
          <span className="text-[#757575]">
            Nhận hàng vào {date.getDate()} tháng {date.getMonth() + 1} -
            {dateTo.getDate()} tháng {dateTo.getMonth() + 1}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Hoả tốc</span>
          <span>Không hỗ trợ</span>
        </div>
      </div>
    </div>
  );
};

export default ShipPrice;
