import Header from "../../../header/Header";
import bv from "../../images/login/bv.png";
import { CiLock } from "react-icons/ci";

const VerifiedPassword = () => {
  return (
    <div className=" bg-white shadow-md">
      <Header title="Xác minh tài khoản" />
      <div className=" w-full relative flex items-center ">
        <div className=" absolute shadow-lg top-[60px] w-[415px] border rounded-md right-[35%] bg-white">
          <div className=" px-5 py-8 ">
            <div className="flex items-center justify-center mb-6">
              <img src={bv} alt="" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <p>
                Để tăng cường bảo mật cho tài khoản của bạn, hãy xác minh thông
                tin bằng một trong những cách sau.
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <button className=" cursor-point group relative w-full h-[40px] flex justify-center mb-5 items-center px-4 py-1 border text-xl   text-[#555]">
                  <CiLock /> <span> Xác minh bằng tài khoản</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedPassword;
