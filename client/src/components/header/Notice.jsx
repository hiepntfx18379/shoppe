import { IoTriangleSharp } from "react-icons/io5";

const Notice = () => {
  return (
    <>
      <div className="w-[300px] h-[400px] z-30 bg-white border border-outline shadow-lg mt-1 relative">
        <div className="">
          <IoTriangleSharp className=" absolute -top-[12px] right-3 " />
          <span className="text-[rgb(0,0,0,0.26)] p-3 text-lg">
            Thông báo mới nhận
          </span>

          <div className="flex flex-col items-center gap-5 mt-12">
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/6643266a9242f0098d4d4bca31090524.png"
              alt=""
              width="60%"
            />
            <span className="text-black">Đang tải...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
