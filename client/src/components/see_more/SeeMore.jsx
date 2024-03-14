import React from "react";
import Navbar from "../home/navbar/Navbar";
import SearchBox from "./left/SearchBox";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { useTranslation } from "react-i18next";

export default function SeeMore() {
  const { t } = useTranslation();
  return (
    <div>
      <Navbar />
      <div className="w-[90%] m-auto ">
        <div className="flex items-center ">
          <div className="w-full flex-1 h-[1px] bg-[#dbdbdb] "></div>
          <div className=" bg-[#ee4d2d] text-xl text-white border rounded-lg px-6 py-3 uppercase font-semibold">
            {t("suggest")}
          </div>
          <div className="w-full flex-1 h-[1px] bg-[#dbdbdb] "></div>
        </div>

        <div className="grid grid-cols-[1fr,3fr] gap-3 mt-4">
          <div>
            <SearchBox />
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
