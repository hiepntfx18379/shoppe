import { useState } from "react";
import ShippingAdress from "../home/product/detail/shipping/ShippingAddress";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { infoUser } from "../user/user.slide";

const InfoCustomer = ({ num }) => {
  const infoReceiver = useSelector(infoUser);
  const [openChangeAddress, setOpenChangeAddress] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className={`bg-white relative w-[${num}%] m-auto `}>
        <div className="bg-[repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6_33px,transparent_0,transparent_41px,#f18d9b_0,#f18d9b_74px,transparent_0,transparent_82px)] bg-[116px_3px] h-[3px] w-full ackground-position-x: -30px mt-5"></div>

        <div className="py-8 px-8">
          <div className="flex gap-4 items-center">
            <svg
              height="16"
              viewBox="0 0 12 16"
              width="12"
              class="shopee-svg-icon icon-location-marker"
            >
              <path
                d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                fill-rule="evenodd"
                className=" fill-main"
              ></path>
            </svg>
            <span className="text-main text-lg">{t("address")}</span>
          </div>

          <div className="text-base flex gap-3 mt-3">
            <div className="  font-semibold">
              <span className="border-r-2 border-main pr-2 cursor-pointe ">
                {infoReceiver?.receiver?.name}
              </span>
              <span className=" mx-3">{infoReceiver?.receiver?.phone}</span>
            </div>
            <div className="flex gap-6 items-center">
              <div className="">
                <span>{infoReceiver?.receiver?.detail} </span>
                <span>{infoReceiver?.receiver?.address}</span>
              </div>

              <span className="border border-main py-0 px-1 text-[10px] text-main">
                {t("default")}
              </span>
            </div>
            <div
              onClick={() => {
                setOpenChangeAddress(true);
              }}
              className=" text-blue-500 hover:cursor-pointer"
            >
              {t("change")}
            </div>
            {openChangeAddress && (
              <div className=" absolute top-[25px]">
                <ShippingAdress setAddress={setOpenChangeAddress} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCustomer;
