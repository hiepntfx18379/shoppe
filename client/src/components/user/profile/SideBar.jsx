import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const [active, setActive] = useState(1);
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white shadow-sm p-4 pt-8">
      <Link
        to="/profile"
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={30} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-main" : ""} 800px:block`}>
          {t("profile")}
        </span>
      </Link>

      <Link
        to="purchase"
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={30} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-main" : ""} 800px:block`}>
          {t("order")}
        </span>
      </Link>

      <Link
        to="verifyOldPwd"
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={30} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-main" : ""} 800px:block`}>
          {t("changepwd")}
        </span>
      </Link>
    </div>
  );
};

export default SideBar;
