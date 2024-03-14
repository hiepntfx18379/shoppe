import React from "react";
import logo from "./imgHeader/Shopee.svg.webp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = ({ title }) => {
  const { t } = useTranslation();
  return (
    <nav className=" flex items-center w-[80%] m-auto justify-between py-3 h-[84px]">
      <Link to="/" className="flex gap-2">
        <div>
          <img src={logo} alt="logo shopee" width={140} height={140} />
        </div>
        <div className=" font-normal text-[25px] pt-[10px]">{title}</div>
      </Link>
      <div className=" text-[#ee4d2d] pt-[15px]">{t("needHelp")}</div>
    </nav>
  );
};

export default Header;
