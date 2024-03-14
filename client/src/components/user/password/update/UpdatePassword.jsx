import { FaArrowLeft } from "react-icons/fa";
import React, { useState } from "react";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../../../header/Header";

const UpdatePassword = () => {
  const [visible, setVisile] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    console.log({ password });
  };
  return (
    <div className=" bg-white shadow-md">
      <Header title="Sửa mật khẩu" />
      <div className=" w-full relative flex items-center ">
        <div className=" absolute shadow-lg top-[60px] w-[400px] border rounded-md right-[35%] bg-white">
          <div className=" px-5 py-8 ">
            <div className="flex items-center justify-between mb-6">
              <div className="text-main">
                <FaArrowLeft className="color-main w-6" />
              </div>
              <div className="text-[1.25rem] text-[#222] font-medium ">
                <span>Nhập mật khẩu</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="Nhập lại mật khẩu để xác minh"
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
                  disabled={password === "" ? true : false}
                  className={
                    password === ""
                      ? `opacity-50 cursor-not-allowed group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white`
                      : " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                  }
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
