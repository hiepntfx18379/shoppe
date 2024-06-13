import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../user.slide";

const ChangePassword = () => {
  const [pwd, setPassword] = useState("");
  const [confirmPwd, setConfirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ss = await axios.patch("/user/changePassword", {
        pwd,
      });
      toast.success(ss.data.message);
      toast.success("Vui lòng đăng nhập lại");
      dispatch(setUser(null));
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className=" bg-white -mb-[40px]">
      <div className=" bg-main w-full relative">
        <div className=" absolute top-[3px] w-[400px] border rounded-md left-[30%] bg-white">
          <div className=" px-5 py-2 ">
            <div className="flex items-center gap-1">
              <div className=" block text-[1.25rem] text-[#222] font-medium">
                Nhập mật khẩu mới
              </div>
            </div>
            <form className="space-y-6 mt-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="mt-1">
                  <input
                    type="password"
                    name="name"
                    placeholder="Mật khẩu mới"
                    value={pwd}
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
                    name="name"
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPwd}
                    onChange={(e) => setConfirm(e.target.value)}
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
                  disabled={pwd === "" || confirmPwd === "" ? true : false}
                  className={
                    pwd !== confirmPwd || pwd === "" || confirmPwd === ""
                      ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                      : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                  }
                  title={pwd !== confirmPwd ? "Mật khẩu không khớp" : ""}
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
