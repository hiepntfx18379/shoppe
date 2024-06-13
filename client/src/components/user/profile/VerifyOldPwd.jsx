import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const VerifyOldPwd = () => {
  const [oldPwd, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ss = await axios.post("/user/verifyOldPwd", {
        oldPwd,
      });
      toast.success(ss.data.message);
      navigate("/profile/change-password");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className=" bg-white -mb-[40px]">
      <div className=" bg-main w-full relative">
        <div className=" absolute top-[35px] w-[400px] border rounded-md left-[30%] bg-white">
          <div className=" px-5 py-2 ">
            <div className="flex items-center gap-1">
              <div className=" block text-[1.25rem] text-[#222] font-medium">
                Nhập mật khẩu cũ
              </div>
            </div>
            <form className="space-y-6 mt-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="mt-1">
                  <input
                    type="password"
                    name="name"
                    placeholder="Mật khẩu cũ"
                    value={oldPwd}
                    onChange={(e) => setPassword(e.target.value)}
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
                  disabled={oldPwd === "" ? true : false}
                  className={
                    oldPwd === ""
                      ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                      : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                  }
                >
                  {t("next")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOldPwd;
