import auth from "../images/services/auth.png";
import freeship from "../images/services/freeship.png";
import freevoucher from "../images/services/freevoucher.png";
import nap from "../images/services/nap.png";
import outlet from "../images/services/outlet.png";
import salsale from "../images/services/sansale.png";
import sieure from "../images/services/sieure.png";
import trend from "../images/services/trend.png";
import vnd from "../images/services/vnd.png";
import voucher from "../images/services/voucher.png";

const Services = () => {
  return (
    <div className="flex justify-around mt-8 mb-5">
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={auth} alt="img" className="w-[45px] h-[45px]" />
        <span className=" text-[13px] text-center px-[8px] font-medium text-[#222] h-[40px]">
          Hàng quốc tế
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={freeship} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center px-[8px] font-medium text-[#222] h-[40px] text-[13px] w-full">
          Miễn phí ship - Có shopee
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center mb-2">
        <img src={freevoucher} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center font-medium text-[#222] h-[40px] text-[13px] w-full">
          Nhận free voucher 30.000đ
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={nap} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center px-[8px] font-medium text-[#222] h-[40px] text-[13px] w-full">
          {" "}
          Nạp thẻ, dịch vụ & Data
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={outlet} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center  font-medium text-[#222] h-[40px] text-[13px] w-full">
          Hàng hiệu outlet giảm 50%
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={salsale} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center px-[8px] font-medium text-[#222] h-[40px] text-[13px] w-full">
          Khung giờ săn sale
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={sieure} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center px-[18px] font-medium text-[#222] h-[40px] text-[13px] w-full">
          Shopee siêu rẻ
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={trend} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center px-[8px] font-medium text-[#222] h-[40px] text-[13px] w-full">
          Bắt trend - Giá sốc
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={vnd} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center px-[8px] font-medium text-[#222] h-[40px] text-[13px] w-full">
          Mã giảm giá
        </span>
      </div>
      <div className="w-[100px] h-[81px] grid grid-rows-2 gap-6 justify-items-center">
        <img src={voucher} alt="img" className="w-[45px] h-[45px]" />
        <span className="text-center px-[8px] font-medium text-[#222] h-[40px] text-[13px] w-full">
          Voucher giảm đến 500.000đ
        </span>
      </div>
    </div>
  );
};

export default Services;
