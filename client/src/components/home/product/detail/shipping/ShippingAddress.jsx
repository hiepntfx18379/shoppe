import React, { useState } from "react";
import InfoShipping from "./InfoShipping";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { infoUser } from "../../../../user/user.slide";

const ShippingAdress = ({ setAddress }) => {
  const info = useSelector(infoUser);
  const [newAdd, setNewAdd] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className=" w-[500px] border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className=" text-base font-semibold">{t("shipping")}</h3>
              <div
                className="text-base font-semibold cursor-pointer"
                onClick={() => setAddress(false)}
              >
                X
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div> {t("myAddress")}</div>
              {info && (
                <div className=" mt-2">
                  <div>
                    <span className=" pr-2 text-base  border-r-2 border-black/[.54]">
                      {info.receiver.name}
                    </span>
                    <span className=" pl-2 text-[rgba(0,0,0,0.54)]">
                      {info.receiver.phone.substring(1)}
                    </span>
                  </div>
                  <div className="flex flex-col text-black/[.54]">
                    <span>{info.receiver.detail}</span>
                    <span>{info.receiver.address}</span>
                  </div>
                </div>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-start p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="border border-[#757575] px-4 py-2"
                onClick={() => setNewAdd(true)}
              >
                + {t("addNewAdd")}
              </button>
            </div>
          </div>
        </div>
        {newAdd && <InfoShipping setAddress={setAddress} />}
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ShippingAdress;
