import React from "react";
import CountdownTime from "./CountdownTime";

const ClickOTP = ({ k, time, getOTP }) => {
  return (
    <div className="flex justify-between mt-2">
      <CountdownTime k={k} time={time} />
      <button className=" underline  text-blue-500" onClick={() => getOTP()}>
        {" "}
        Gửi lại OTP
      </button>
    </div>
  );
};

export default ClickOTP;
