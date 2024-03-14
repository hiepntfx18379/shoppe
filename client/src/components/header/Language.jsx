import React from "react";
import { IoTriangleSharp } from "react-icons/io5";

const Language = ({ setLang }) => {
  return (
    <div className="w-[150px] h-auto z-30 bg-white border border-outline shadow-lg mt-3 relative">
      <div className="">
        <IoTriangleSharp className=" absolute -top-[12px] right-3 " />

        <div className="flex flex-col items-center gap-2 py-1">
          <button
            className="text-black hover:text-main"
            onClick={() => setLang(false)}
          >
            Tiếng Việt
          </button>
          <button
            className="text-black hover:text-main"
            onClick={() => setLang(false)}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default Language;
