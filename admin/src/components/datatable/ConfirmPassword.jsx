import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ConfirmPassword = ({ setEnter, userID }) => {
  const [password, setPassword] = useState("");

  const handleConfirm = async () => {
    try {
      const change = await axios.post(`/user/confirmPass/${userID}`, {
        password,
      });
      toast.success(change.data.message);

      setEnter(false);
    } catch (e) {
      toast.error("Password is wrong, Please again");
      setEnter(false);
    }
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className=" w-[500px] border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className=" text-base font-semibold flex items-center justify-between gap-2">
                <span>Vui lòng nhập mật khẩu tài khoản</span>
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-col gap-2">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Nhập mật khẩu"
                className=" border outline-none py-2 px-2"
              />
            </div>
            {/*footer*/}
            <div className=" justify-between flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                onClick={() => setEnter(false)}
                className="border border-[#757575] px-4 py-2 hover:text-black hover:bg-[#ee4d2d]"
              >
                Quay lại
              </button>
              <button
                onClick={() => handleConfirm()}
                className="border border-[#757575] px-4 py-2 text-black bg-[#ee4d2d]"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ConfirmPassword;
