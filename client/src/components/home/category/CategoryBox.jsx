import React from "react";

const CategoryBox = ({ link, name }) => {
  return (
    <div className=" border-[0,0,0,.05] h-[150px] flex flex-col border-r relative">
      <div className=" pr-1 pt-1">
        <div className="  w-full h-[110px] cursor-pointer transition shadow-md hover:scale-110 hover:ease-in-out">
          <img src={link} alt="" className="h-[90%] w-[90%] shadow-xl " />
        </div>
        <span className="flex justify-center text-[#222] font-bold my-2 text-base">
          {name}
        </span>
      </div>
      <div className="border border-[0,0,0,.05] rotate-45 bottom-[41px] right-[3.8px] absolute w-[15.5px]"></div>
    </div>
  );
};

export default CategoryBox;
