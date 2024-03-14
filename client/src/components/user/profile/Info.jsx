import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { infoUser } from "../user.slide";
import InfoCustomer from "../../checkout/InfoCustomer";
import axios from "axios";
import { toast } from "react-toastify";

const Info = () => {
  const { t } = useTranslation();
  const info = useSelector(infoUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setName(info?.name);
    setEmail(info?.email);
    setPhone(info?.phone);
  }, [info]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editInfo = {
        name,
        email,
        phone,
        receiver: info?.receiver,
      };

      const res = await axios.patch("/user/updateInfo", editInfo);
      toast.success(res.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="px-8 py-4">
      <h2 className=" text-lg">{t("myProfile")}</h2>
      <span className=" text-5"> {t("forWhatProfile")} </span>
      <div className="">
        <InfoCustomer num={100} />
        <div className="flex flex-col gap-4">
          <h2 className=" text-lg">{t("customer")}</h2>

          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className="mt-1">
                <label htmlFor="name"> {t("username")} </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("inputInfo")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={"Email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="mt-1 relative">
                <label htmlFor="phone"> {t("phone")}</label>
                <input
                  type="text"
                  name="phone"
                  placeholder={t("phone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border 
                  border-gray-300 shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={
                  " opacity-100 cursor-point group relative w-full h-[40px] flex justify-center px-4 py-1 border border-transparent text-xl font-medium  bg-main text-white"
                }
              >
                {t("save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Info;
