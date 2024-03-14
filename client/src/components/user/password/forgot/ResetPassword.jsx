import React, { useCallback, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../../../header/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { activation_token } = useParams();
  console.log(activation_token);
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (activation_token) {
          const ss = await axios.patch(
            `/user/resetPassword/${activation_token}`,
            {
              password,
            },
          );
          toast.success(ss.data.message);
          navigate("/login");
        }
      } catch (err) {
        toast.error("Hết thời gian chờ");
      }
    },
    [activation_token, password, navigate],
  );

  return (
    <>
      <>
        <div className=" bg-white shadow-md h-max">
          <Header title={t("resetPwd")} />
        </div>

        <div className=" w-full relative flex items-center ">
          <div className=" shadow-lg w-[400px] border rounded-md bg-white my-[5%] mx-[35%]">
            <div className=" px-5 py-8 ">
              <div className="flex items-center justify-between mb-6">
                <div className="text-main">
                  <Link to="/login">
                    <FaArrowLeft className="color-main w-6" />
                  </Link>
                </div>
                <div className="text-[1.25rem] text-[#222] font-medium ">
                  <span>{t("resetPwd")}</span>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      placeholder={t("inputPwd")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 shadow-sm placeholder-zinc-500 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      placeholder={t("confirmPwd")}
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 shadow-sm placeholder-zinc-500 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={password !== confirmPwd ? true : false}
                    className={
                      password !== confirmPwd
                        ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                        : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                    }
                    title={
                      password !== confirmPwd ? "Mật Khẩu nhập không khớp" : ""
                    }
                  >
                    {t("next")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ResetPassword;
