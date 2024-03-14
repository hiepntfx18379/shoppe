import { useCallback, useState } from "react";
import bgLogin from "../images/login/login2.png";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import qrCode from "../images/login/qr.png";
import Header from "../../header/Header";
import gg from "../images/login/google.png";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import axios from "axios";
import { setUser } from "../user.slide";

const Login = () => {
  const [visible, setVisile] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const insane = axios.create({
          withCredentials: true,
          baseURL: "http://localhost:5000",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        await insane
          .post("http://localhost:5000/auth/login", {
            email,
            password,
          })
          .then((res) => {
            const { name, email, phone, receiver } = res.data.user;
            dispatch(setUser({ name, email, phone, receiver }));
            toast.success(res.data.message);
            navigate("/");
          });
      } catch (e) {
        toast.error(e.response.data.message);
      }
    },
    [email, password, dispatch, navigate],
  );

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className=" bg-white -mb-[40px]">
      <Header title={t("login")} />
      <div className=" bg-main w-full relative">
        <div className="w-[80%] m-auto ">
          <img src={bgLogin} alt="main-img-login" />
        </div>
        <div className=" absolute top-[60px] w-[400px] border rounded-md right-[12%] bg-white">
          <div className=" px-5 py-2 ">
            <div className="flex items-center justify-between gap-1">
              <div className=" block text-[1.25rem] text-[#222] font-medium">
                {t("login")}
              </div>
              <div className="">
                <img src={qrCode} alt="QrCode" />
              </div>
            </div>
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("inputInfo")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
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
                  border-gray-300 shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />

                  {/* btn display */}
                  {visible ? (
                    <AiFillEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisile(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisile(true)}
                    />
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={email === "" || password === "" ? true : false}
                  className={
                    email === "" || password === ""
                      ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                      : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                  }
                >
                  {t("login")}
                </button>
                <div className=" flex justify-start text-blue-600 text-sm font-normal mt-2 -mb-5">
                  <Link to="/forgotPwd">{t("forgotPwd")}</Link>
                </div>
              </div>
            </form>

            <div className="flex items-center my-[30px]">
              <div className="w-full flex-1 h-[1px] bg-[#dbdbdb] "></div>
              <div className=" px-4 uppercase font-semibold text-[#ccc]">
                {t("or")}
              </div>
              <div className="w-full flex-1 h-[1px] bg-[#dbdbdb] "></div>
            </div>

            <div className="flex items-center justify-between gap-1 font-normal outline-none">
              {/* <button
                onClick={facebook}
                className=" flex items-center justify-center gap-2 border py-[10px] px-[55px]"
              >
                <img src={fb} alt="fb_image" width="22px" height="22px" />
                <span>Facebook</span>
              </button> */}
              <button
                onClick={google}
                className="flex w-full items-center justify-center gap-2 border py-[10px] px-[55px]"
              >
                <img src={gg} alt="fb_image" width="22px" height="22px" />
                <span>Google</span>
              </button>
            </div>

            <div>
              <p className="text-[#b19e9e] flex justify-center items-center my-4">
                {t("uKnow")}
                <Link to="/register" className="text-main">
                  {t("register")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
