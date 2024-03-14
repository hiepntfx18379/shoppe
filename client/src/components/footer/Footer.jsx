import visa from "./images/visa.png";
import master from "./images/master.png";
import jcb from "./images/jcb.png";
import aexpress from "./images/express.png";
import cod from "./images/cod.png";
import tg from "./images/tg.png";
import spay from "./images/spay.png";
import spaylater from "./images/spaylater.png";
import spx from "./images/spx.png";
import ghtk from "./images/ghtk.png";
import ghn from "./images/ghn.png";
import vtpost from "./images/vtpost.png";
import vnpost from "./images/vnpost.png";
import jtex from "./images/jtexpress.png";
import grab from "./images/grad.png";
import ninja from "./images/ninja.png";
import best from "./images/best.png";
import be from "./images/be.png";
import aha from "./images/ahamove.png";
import qr from "./images/qr.png";
import apple from "./images/appst.png";
import ggplay from "./images/ggplay.png";
import appgll from "./images/appgll.png";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className=" w-full bg-white mt-10 ">
      <div className=" border-[#ee4d2d] border-[2px] mb-6"></div>
      <div className="flex justify-between w-[90%] m-auto ">
        <div className="flex flex-col">
          <span className="text-[rgba(0,0,0,.87)] text-[12px] font-bold mt-9 mb-5 uppercase">
            {t("serviceF")}
          </span>
          <ul className="flex flex-col gap-2 ">
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("helpF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("blogF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("mallF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("buyF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("sellF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("paymentF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("coinsF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("shippingF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("returnF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("contactF")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("policy")}
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <span className="text-[rgba(0,0,0,.87)] text-[12px] font-bold mt-9 mb-5 uppercase">
            {t("aboutF")}
          </span>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("us")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("careers")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("policyS")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("privacyS")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("mallS")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("sellerS")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("flashS")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("programmeS")}
            </li>
            <li className="hover:text-[#ee4d2d] hover:cursor-pointer">
              {t("contactS")}
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="flex flex-col">
            <span className="text-[rgba(0,0,0,.87)] text-[12px] font-bold mt-9 mb-5  uppercase">
              {t("paymentFS")}
            </span>
            <div className="grid grid-cols-3 gap-2 justify-center">
              <img
                src={visa}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img
                src={master}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img src={jcb} alt="" className=" border rounded shadow-md p-2" />
              <img
                src={aexpress}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img src={cod} alt="" className=" border rounded shadow-md p-2" />
              <img src={tg} alt="" className=" border rounded shadow-md p-2" />
              <img
                src={spay}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img
                src={spaylater}
                alt=""
                className=" border rounded shadow-md p-2"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[rgba(0,0,0,.87)] text-[12px] font-bold mt-9 mb-5 uppercase">
              {t("logicticsFS")}
            </span>
            <div className="grid grid-cols-3 gap-2 justify-center">
              <img src={spx} alt="" className=" border rounded shadow-md p-2" />
              <img
                src={ghtk}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img src={ghn} alt="" className=" border rounded shadow-md p-2" />
              <img
                src={vtpost}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img
                src={vnpost}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img
                src={jtex}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img
                src={grab}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img
                src={ninja}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img
                src={best}
                alt=""
                className=" border rounded shadow-md p-2"
              />
              <img src={be} alt="" className=" border rounded shadow-md p-2" />
              <img src={aha} alt="" className=" border rounded shadow-md p-2" />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[rgba(0,0,0,.87)] text-[12px] font-bold mt-9 mb-5 uppercase">
            {t("followFS")}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 ">
              <FaFacebook />{" "}
              <span className="hover:text-[#ee4d2d] hover:cursor-pointer ml-2">
                Facebook
              </span>
            </div>
            <div className="flex gap-1 ">
              <FaInstagramSquare />{" "}
              <span className="hover:text-[#ee4d2d] hover:cursor-pointer ml-2">
                Instagram
              </span>
            </div>
            <div className="flex gap-1 ">
              <FaLinkedin />{" "}
              <span className="hover:text-[#ee4d2d] hover:cursor-pointer ml-2">
                LinkedIn{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-black text-[12px] font-bold mt-9 mb-5 uppercase ">
            {t("appD")}
          </span>
          <div className="grid grid-cols-2">
            <img src={qr} alt="" className=" border rounded shadow-md p-1" />
            <div className="grid grid-cols-1 gap-y-1">
              <img
                src={apple}
                alt=""
                className=" border rounded shadow-md p-1"
              />
              <img
                src={ggplay}
                alt=""
                className=" border rounded shadow-md p-1"
              />
              <img
                src={appgll}
                alt=""
                className=" border rounded shadow-md p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
