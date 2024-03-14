import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { userContext } from "../../../../parentPage/ParentPage";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../user/user.slide";

const InfoShipping = ({ setAddress }) => {
  const user = useContext(userContext);
  const [searchAdd, setSearchAdd] = useState(false);
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listCommunce, setListCommunce] = useState([]);
  const [active, setActive] = useState("");
  const [result, setResult] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistric] = useState("");
  const [communce, setCommnunce] = useState("");
  const [nameCus, setNameCus] = useState("");
  const [phone, setPhone] = useState("");
  const [detailAdd, setDetailAdd] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (city !== "") {
      setResult(`${city}`);
      setActive("province");
      if (district !== "") {
        setResult(`${city}, ${district}`);
        setActive("communce");
        if (communce !== "") {
          setResult(`${communce}, ${district}, ${city}`);
          setSearchAdd(false);
        }
      }
    }
  }, [city, district, communce]);

  const focusFnc = useCallback(() => {
    setActive("city");
    (async () => {
      await fetch("https://vapi.vnappmob.com/api/province")
        .then(async (res) => await res.json())
        .then(({ results }) => {
          const ds = [];
          results.forEach((data) =>
            ds.push({ name: data.province_name, code: data.province_id }),
          );
          setListCity(ds);
        });
    })();
    setSearchAdd(true);
  }, []);

  // onClick btn Hoan Thanh
  const completed = useCallback(async () => {
    if (nameCus === "") {
      alert("Vui lòng điền họ tên");
      return false;
    } else if (result === "") {
      alert("Vui lòng điền tên thành phố, quận/huyện, xã/phường");
      return false;
    } else if (detailAdd === "") {
      alert("Vui lòng điền địa chỉ cụ thể");
      return false;
    } else {
      // update info user
      try {
        await axios
          .patch("/user/receiver", {
            email: user.email,
            infoReceiver: {
              name: nameCus,
              phone: `(+84) ${phone.substring(1)}`,
              address: result,
              detail: detailAdd,
            },
          })
          .then((res) => {
            toast.success(res.data.message);
            const updateUser = {
              name: user.name,
              email: user.email,
              phone: user.phone,
              receiver: res.data.user.receiver,
            };
            dispatch(setUser(updateUser));
          });
        setAddress(false);
      } catch (e) {
        toast.error(e.response.data.message);
      }
    }
  }, [
    detailAdd,
    phone,
    nameCus,
    setAddress,
    user.name,
    user.phone,
    dispatch,
    result,
    user.email,
  ]);

  const liCityOnClick = useCallback(
    (ds) => {
      setCity(ds.name);
      setActive("province");
      (async () => {
        await fetch(
          `https://vapi.vnappmob.com//api/province/district/${ds.code}`,
        )
          .then(async (res) => await res.json())
          .then(({ results }) => {
            const ds = [];
            results.forEach((data) =>
              ds.push({ name: data.district_name, code: data.district_id }),
            );
            setListDistrict(ds);
          });
      })();
      if (city !== ds.name) {
        setDistric("");
        setCommnunce("");
      }
    },
    [city],
  );

  const liProvinceOnClick = useCallback((ds) => {
    setDistric(ds.name);
    setActive("communce");

    (async () => {
      await fetch(`https://vapi.vnappmob.com/api/province/ward/${ds.code}`)
        .then(async (res) => await res.json())
        .then(({ results }) => {
          const wards = [];
          results.forEach((w) => {
            wards.push({ name: w.ward_name });
          });
          setListCommunce(wards);
        });
    })();
  }, []);

  return (
    <>
      <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className=" w-[500px] border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="p-5">
              <div className=" mb-4  text-lg text-black">{t("newAdd")}</div>
              <div className="grid grid-cols-2 gap-2 justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className=" border-[#757575] border-[0.5px] p-2"
                  onChange={(e) => setNameCus(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  value={phone}
                  className="border border-[#757575] p-2"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="grid  mb-4">
                {
                  <input
                    placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                    value={result}
                    onFocus={() => focusFnc()}
                    // onBlur={() => blurFnc()}
                    className={`border ${
                      result !== "" ? "text-black" : null
                    } border-[#757575] p-2`}
                  />
                }
              </div>
              <div>
                <textarea
                  className={`w-full p-2 border ${
                    city !== "" || district !== "" || communce !== ""
                      ? "cursor-auto"
                      : "cursor-not-allowed"
                  } border-[#757575] overflow-auto resize-none outline-none`}
                  placeholder="Địa chỉ cụ thể"
                  disabled={
                    city !== "" || district !== "" || communce !== ""
                      ? false
                      : true
                  }
                  rows={2}
                  onChange={(e) => setDetailAdd(e.target.value)}
                />
              </div>

              {searchAdd && (
                <>
                  {/* button group */}
                  <div
                    className="grid grid-cols-3 items-center justify-between  border-t border-l border-r h-auto"
                    role="group"
                  >
                    <button
                      id="city"
                      onClick={() => setActive("city")}
                      className={`px-4 py-2 text-sm font-medium  bg-white border-b-2   ${
                        active === "city"
                          ? "text-[#ee4d2d] border-b-[#ee4d2d]"
                          : "text-black border-b"
                      }  focus:z-10`}
                    >
                      {t("city")}
                    </button>
                    <button
                      onClick={() => setActive("province")}
                      className={`px-4 py-2 text-sm font-medium  bg-white border-b-2   ${
                        active === "province"
                          ? "text-[#ee4d2d] border-b-[#ee4d2d] "
                          : "text-[#757575] border-b"
                      }  focus:z-10 ${
                        listDistrict.length > 0
                          ? "cursor-default"
                          : "cursor-not-allowed"
                      }`}
                      disabled={listDistrict.length > 0 ? false : true}
                    >
                      {t("district")}
                    </button>
                    <button
                      onClick={() => setActive("communce")}
                      className={`px-4 py-2 text-sm font-medium  bg-white border-b-2   ${
                        active === "communce"
                          ? "text-[#ee4d2d] border-b-[#ee4d2d]"
                          : "text-[#757575] border-b"
                      }  focus:z-10 ${
                        listCommunce.length > 0
                          ? "cursor-default"
                          : "cursor-not-allowed"
                      }`}
                      disabled={listCommunce.length > 0 ? false : true}
                    >
                      {t("communce")}
                    </button>
                  </div>

                  {/* display content */}
                  {listCity.length > 0 && active === "city" ? (
                    <div
                      className={`block w-full h-[200px] overflow-auto border-l border-r border-b`}
                    >
                      <ul maxMenuHeight={120}>
                        {listCity.map((ds) => (
                          <li
                            className={` ${
                              result.includes(ds.name)
                                ? "text-[#ee4d2d]"
                                : "text-black"
                            } pl-4 mt-2 hover:cursor-pointer`}
                            value={ds.name}
                            onClick={() => liCityOnClick(ds)}
                          >
                            {ds.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {listDistrict.length > 0 && active === "province" ? (
                    <div
                      className={`block w-full h-[200px] overflow-auto border-l border-r border-b`}
                    >
                      <ul maxMenuHeight={120}>
                        {listDistrict.map((ds) => (
                          <li
                            className={` ${
                              result.includes(ds.name)
                                ? "text-[#ee4d2d]"
                                : "text-black"
                            } pl-4 mt-2 cursor-pointer`}
                            value={ds.name}
                            onClick={() => liProvinceOnClick(ds)}
                          >
                            {ds.name}
                          </li>
                        ))}
                      </ul>{" "}
                    </div>
                  ) : null}

                  {listCommunce.length > 0 && active === "communce" ? (
                    <div
                      className={`block w-full h-[200px] overflow-auto border-l border-r border-b`}
                    >
                      <ul maxMenuHeight={120}>
                        {listCommunce.map((ds) => (
                          <li
                            className={` ${
                              result.includes(ds.name)
                                ? "text-[#ee4d2d]"
                                : "text-black"
                            } pl-4 mt-2 cursor-pointer`}
                            value={ds.name}
                            onClick={() => setCommnunce(ds.name)}
                          >
                            {ds.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 gap-4 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="border border-[#757575] px-4 py-2 text-black "
                onClick={() => setAddress(false)}
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => completed()}
                className="border border-[#757575] px-4 py-2 bg-[#ee4d2d] text-white"
              >
                {t("confirm")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default InfoShipping;
