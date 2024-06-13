import React from "react";
import { useTranslation } from "react-i18next";
import { IoTriangleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../user/user.slide";

const BoxUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
    dispatch(setUser(null)); 
  };

  return (
    <div className=" relative">
      <IoTriangleSharp className=" absolute -top-[12px] right-3 " />
      <div className="flex flex-col w-[150px] bg-white">
        <Link
          to="/profile"
          className=" hover:cursor-pointer text-black hover:text-[#26aa99] hover:bg-slate-300 py-1 pl-2"
        >
          {t("account")}
        </Link>
        <Link
          to="/profile/purchase"
          className=" hover:cursor-pointer text-black hover:text-[#26aa99] hover:bg-slate-300 py-1 pl-2"
        >
          {t("purchase")}
        </Link>
        <Link
          to="/login"
          className=" hover:cursor-pointer text-black hover:text-[#26aa99] hover:bg-slate-300 py-1 pl-2"
        >
          <button onClick={handleLogout}>{t("logout")}</button>
        </Link>
      </div>
    </div>
  );
};

export default BoxUser;
