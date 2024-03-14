import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import bgLogin from "../images/login/login2.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../header/Header";
import CountdownTime from "./CountdownTime";

const OTPVerify = () => {
  const phone = useLocation().state.phone;
  const [otp, setOTP] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const ss = await axios.post("http://localhost:5000/auth/verify", {
          phone,
          otp,
        });
        toast.success(ss.data.message);
        navigate("/infoUser", { state: phone });
      } catch {
        toast.error("Mã OTP không đúng");
      }
    },
    [otp, phone, navigate],
  );

  const getOTP = useCallback(async () => {
    const ss = await axios.post("http://localhost:5000/auth/signUp", {
      phone,
    });

    toast.success(ss.data.message);
  }, [phone]);

  return (
    <div className=" bg-white -mb-[40px]">
      <Header title="Nhập mã OTP" />
      <div className=" bg-main w-full relative">
        <div className="w-[80%] m-auto ">
          <img src={bgLogin} alt="main-img-login" />
        </div>
        <div className=" absolute top-[60px] w-[400px] border rounded-md right-[12%] bg-white">
          <div className=" px-5 py-2 ">
            <div className="flex items-center gap-1">
              <div className=" block text-[1.25rem] text-[#222] font-medium">
                Mã OTP
              </div>
            </div>
            <form className="space-y-6 mt-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Mã OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 shadow-sm placeholder-zinc-500 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  disabled={otp === "" ? true : false}
                  className={
                    otp === ""
                      ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                      : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                  }
                >
                  {t("next")}
                </button>
              </div>
            </form>

            <div className="flex justify-between mt-2">
              <CountdownTime />
              <button
                className=" underline  text-blue-500"
                onClick={() => getOTP()}
              >
                {" "}
                Gửi lại OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
