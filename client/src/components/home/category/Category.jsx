import React from "react";
import clb from "../images/poster/a0_clb.png";
import qg from "../images/poster/ao_qg.png";
import kamito from "../images/poster/ao_kamito.png";
import kawai from "../images/poster/ao_kawin.png";
import CategoryBox from "./CategoryBox";
import { data } from "./CategoryData";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className=" font-semibold text-xl py-4 pl-3 uppercase text-[#222]">
        {t("categories")}
      </div>
      <div className="h-[300px] grid grid-rows-[1fr,2fr] ">
        <div className="flex gap-1 justify-around border-t border-b border-[0,0,0,.05] mb-3">
          {data.map((box) => (
            <CategoryBox link={box.link} name={box.name} />
          ))}
          <div className=" border-[0,0,0,.05] h-[150px] flex flex-col relative">
            <div className=" pr-1 pt-1">
              <div className="  w-full h-[110px] cursor-pointer transition  shadow-md hover:scale-110 hover:ease-in-out">
                <img
                  src=" https://www.sport9.vn/images/thumbs/002/0021371_giay-da-bong-zocker.jpeg?preset=xmedium"
                  alt=""
                  className="h-[90%] w-[90%] shadow-xl"
                />
              </div>
              <span className="flex justify-center text-[#222] font-bold my-2 text-base">
                Zocker
              </span>
            </div>
            <div className="border border-[0,0,0,.05] rotate-45 bottom-[41px] right-[3.8px] absolute w-[15.5px]"></div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 h-[120px]">
          <img src={clb} alt="" className=" cursor-pointer" />
          <img src={qg} alt="" className=" cursor-pointer" />

          <img src={kamito} alt="" className=" cursor-pointer" />
          <img src={kawai} alt="" className=" cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Category;
