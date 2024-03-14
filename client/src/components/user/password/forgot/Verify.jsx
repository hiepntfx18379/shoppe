import React from "react";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div className="my-7 mt-[100px] flex justify-center w-full h-[250px]">
      <Link to="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox">
        <span className=" bg-cyan-500 text-red-600 p-3 text-2xl font-semibold">
          Go to Your Email
        </span>
      </Link>
    </div>
  );
};

export default Verify;
