import React, { useCallback, useState } from "react";
import Header from "../../header/Header";
import bgLogin from "../images/login/login2.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";

const InfoUSer = () => {
  const navigate = useNavigate();
  const phone = useLocation().state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const ss = await axios.post("http://localhost:5000/auth/register", {
          name,
          email,
          password,
          phone,
        });
        toast.success(ss.data.message);
        toast.success("Vui lòng kiểm tra email!!!");
        navigate("/login");
      } catch {
        toast.error("Email đã tồn tại");
      }
    },
    [phone, navigate, name, email, password],
  );

  return (
    <div className=" bg-white -mb-[40px]">
      <Header title={t("personalInfo")} />
      <div className=" bg-main w-full relative">
        <div className="w-[80%] m-auto ">
          <img src={bgLogin} alt="main-img-login" />
        </div>
        <div className=" absolute top-[60px] w-[400px] border rounded-md right-[12%] bg-white">
          <div className=" px-5 py-2 ">
            <div className="flex items-center gap-1">
              <div className=" block text-[1.25rem] text-[#222] font-medium">
                {t("register")}
              </div>
            </div>
            <form className="space-y-6 mt-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("username")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 shadow-sm placeholder-zinc-500 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder={t("inputPwd")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 shadow-sm placeholder-zinc-500 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiFillEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  disabled={
                    name === "" || email === "" || password === ""
                      ? true
                      : false
                  }
                  className={
                    phone === "" || email === "" || password === ""
                      ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                      : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                  }
                >
                  {t("register")}
                </button>
              </div>
            </form>

            <div className="flex items-center flex-col mt-8">
              <span className=" text-[12px]">{t("bySinup")}</span>
              <div>
                <span className="text-main text-[12px]">{t("policyS")}</span> &{" "}
                <span className="text-main text-[12px]">{t("privacyS")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUSer;
