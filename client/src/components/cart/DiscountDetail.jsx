import React from "react";
import { useTranslation } from "react-i18next";

const DiscountDetail = ({ oldPrice, actualPrice }) => {
  const { t } = useTranslation();

  return (
    <div className="p-5 bg-white shadow-xl w-[400px]">
      <div className="text-base border-b text-black py-3">
        {t("discountDetail")}
      </div>
      <div className="text-base border-b flex justify-between items-center text-black py-3">
        <span>{t("subTotal")} </span>
        <span>₫{new Intl.NumberFormat("en-DE").format(oldPrice)}</span>
      </div>
      <div className="text-base border-b flex justify-between items-center text-black py-3">
        <span>{t("priceDis")} </span>{" "}
        <span>
          -₫{new Intl.NumberFormat("en-DE").format(oldPrice - actualPrice)}
        </span>
      </div>
      <div className="text-base flex justify-between items-center text-black py-1">
        <span>{t("saved")}</span>{" "}
        <span className="text-main">
          -₫{new Intl.NumberFormat("en-DE").format(oldPrice - actualPrice)}
        </span>
      </div>
      <div className="text-base flex justify-between items-center text-black py-1">
        <span>{t("totalAmount")}</span>{" "}
        <span className="">
          ₫{new Intl.NumberFormat("en-DE").format(actualPrice)}
        </span>
      </div>
      <span className="flex justify-end text-sm">{t("finalPrice")}</span>
    </div>
  );
};

export default DiscountDetail;
