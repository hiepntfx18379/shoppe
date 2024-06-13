import { useCallback, useState } from "react";
import bgLogin from "../images/login/login2.png";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../header/Header";
import gg from "../images/login/google.png";
import fb from "../images/login/facebook.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const ss = await axios.post("http://localhost:5000/auth/signUp", {
          phone,
        });
        toast.success(ss.data.message);
        navigate("/verifyOtp", { state: { phone } });
      } catch {
        toast.error("Số điện thoại không hợp lệ");
      }
    },
    [phone, navigate],
  );

  return (
    <div className=" bg-white -mb-[40px]">
      <Header title={t("register")} />
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
                    placeholder={t("phone")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  disabled={phone === "" ? true : false}
                  className={
                    phone === ""
                      ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                      : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                  }
                >
                  {t("next")}
                </button>
              </div>
            </form>

            <div className="flex items-center my-[30px]">
              <div className="w-full flex-1 h-[1px] bg-[#dbdbdb] "></div>
              <div className=" px-4 uppercase font-semibold text-[#ccc]">
                {t("")}Hoặc
              </div>
              <div className="w-full flex-1 h-[1px] bg-[#dbdbdb] "></div>
            </div>

            <div className="flex items-center justify-between gap-1 font-normal outline-none mb-8">
              <button className="flex w-full items-center justify-center gap-2 border py-[10px] px-[55px]">
                <img src={gg} alt="fb_image" width="22px" height="22px" />
                <span>Google</span>
              </button>
            </div>

            <div className="flex items-center flex-col mt-2">
              <span className=" text-[12px]">{t("bySinup")}</span>
              <div>
                <span className="text-main text-[12px]">{t("policyS")}</span> &{" "}
                <span className="text-main text-[12px]">{t("privacyS")}</span>
              </div>
            </div>

            <div>
              <p className="text-[#b19e9e] flex justify-center items-center my-4">
                {t("uKnow")}
                <Link to="/login" className="text-main">
                  {" "}
                  {t("login")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
