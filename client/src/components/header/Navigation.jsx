import React, { useContext, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { IoEarthOutline } from "react-icons/io5";
import Notice from "./Notice";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BoxUser from "./BoxUser";
import { userContext } from "../parentPage/ParentPage";
import Avatar from "react-avatar";

const Navigation = () => {
  const [notice, setNotice] = useState(false);
  const [display, setDisplay] = useState(false);
  const { i18n, t } = useTranslation();
  const user = useContext(userContext);

  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };
  return (
    <div className="h-[34px] bg-main">
      <div className="w-[90%] m-auto text-white flex  justify-between">
        <div className=" flex gap-2 items-center my-2">
          <span className="border-r border-white pr-2 cursor-pointer ">
            {t("seller")}
          </span>
          <span className="border-r border-white pr-2  cursor-pointer">
            {t("dowload")}
          </span>
          <div className=" flex flex-row gap-2">
            <span className="">{t("follow")}</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-white w-5 h-5 cursor-pointer "
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
              </svg>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-white w-5 h-5 cursor-pointer "
              >
                <path d="M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex gap-5 relative">
          <div
            className="flex items-center hover:cursor-pointer hover:text-[rgb(0,0,0,0.75)] hover:opacity-50"
            onMouseMove={() => setNotice(true)}
            onMouseOut={() => setNotice(false)}
          >
            <CiBellOn className=" h-[23px] w-[21px]" />
            <span className=""> {t("notifications")}</span>
          </div>
          {notice && (
            <div className=" absolute top-[30px] right-[77%] ">
              <Notice />
            </div>
          )}
          <div className="flex items-center gap-1 hover:cursor-pointer hover:text-[rgb(0,0,0,0.75)] hover:opacity-50">
            <div className=" rounded-[50%] border px-[7px]">?</div>
            <div> {t("help")}</div>
          </div>
          <div className="flex items-center gap-1 hover:cursor-pointer hover:text-[rgb(0,0,0,0.75)] hover:opacity-50">
            <IoEarthOutline />
            <select
              className="text-black border outline-none"
              defaultValue={i18n.language}
              onChange={(e) => onChangeLang(e)}
            >
              <option key="vn" value="vn">
                Tiếng Việt
              </option>
              <option key="en" value="en">
                English
              </option>
            </select>
          </div>
          <div
            onMouseMove={() => setDisplay(true)}
            onMouseOut={() => setDisplay(false)}
            className=" relative"
          >
            {user ? (
              <>
                <div className=" flex gap-1 items-center pt-2 hover:cursor-pointer hover:text-[rgb(0,0,0,0.75)] hover:opacity-50 ">
                  <div className="w-[22px] rounded-[50%] outline-none h-[22px]">
                    {/* <img
                      src={user.photos[0].value}
                      alt=""
                      className=" object-cover border rounded-[50%] outline-none"
                    /> */}

                    <Avatar
                      name={user.displayName || user.name}
                      color={Avatar.getRandomColor("sitebase", [
                        "red",
                        "green",
                        "blue",
                      ])}
                      round={true}
                      size="22px"
                      className=" border outline-none"
                    />
                  </div>
                  <span>{user.displayName || user.name}</span>
                </div>
                {display && (
                  <Link
                    to="/profile"
                    className="z-50 absolute right-0 mt-1 animate-fade-down animate-duration-100 shadow-xl border outline-none"
                  >
                    <BoxUser />
                  </Link>
                )}
              </>
            ) : (
              <div className="flex gap-2 items-center pt-2 ">
                <Link
                  to="/register"
                  className="border-white border-r-[1px] pr-2 "
                >
                  {t("register")}
                </Link>
                <Link to="/login">{t("login")}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
