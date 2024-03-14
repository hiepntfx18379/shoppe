import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductRow from "./ProductRow";
import Checkbox from "./Checkbox";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import DiscountDetail from "./DiscountDetail";
import confirmCartSlide from "./cart.slide";
import { useTranslation } from "react-i18next";
import {
  allItemsCart,
  decreQuantity,
  increQuantity,
  removeItem,
} from "../home/product/product.slide";
import { infoUser } from "../user/user.slide";

const CartDetail = () => {
  const carts = useSelector(allItemsCart);
  const [listCheck, setListCheck] = useState([]);
  const [total, setTotal] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [detail, setDetail] = useState(false);
  const user = useSelector(infoUser);
  const [checkedOut, setCheckedOut] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (listCheck.length > 0) {
      const get = [];
      for (let id of listCheck) {
        get.push(carts[id]);
      }
      let oldPrice = get.reduce(
        (acc, curent) =>
          acc + Number(curent.oldPrice.replaceAll(".", "") * curent.quantity),
        0,
      );
      let actualMoney = get.reduce(
        (acc, curent) =>
          acc +
          Number(curent.actualPrice.replaceAll(".", "")) * curent.quantity,
        0,
      );
      setTotal(actualMoney);
      setOldPrice(oldPrice);
      setCheckedOut(get);
    } else {
      setTotal(0);
      setOldPrice(0);
    }
  }, [listCheck, carts]);
  // code for check box slow slow
  const handleSelect = (e, id) => {
    if (e.target.checked) {
      setListCheck([...listCheck, id]);
    } else {
      setListCheck(listCheck.filter((e) => e !== id));
    }
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      const ids = carts.map((item, id) => id);
      setListCheck(ids);
    } else {
      setListCheck([]);
    }
  };

  // end code checkbox

  // code for quantity
  const incre = (it) => {
    dispatch(increQuantity(it));
  };

  const decre = (it) => {
    dispatch(decreQuantity(it));
  };

  const del = (it) => {
    dispatch(removeItem(it));
  };

  const confirmCart = () => {
    dispatch(
      confirmCartSlide.actions.addToCartCheckOut({
        user,
        checkedOut,
        total,
      }),
    );
    navigate("/profile/purchase");
  };

  return (
    <div className=" w-[90%] m-auto mt-5 relative">
      <table className="table-auto w-[100%] text-center">
        <thead className="bg-gray-200  tracking-widest">
          <tr className="">
            <th className=" py-4 pl-5 ">
              <Checkbox
                value={listCheck.length === carts.length}
                checkValue={selectAll}
              />
            </th>
            <th colSpan={2}>
              <label for="element">{t("product")}</label>
            </th>
            <th>{t("size")}</th>
            <th colSpan={2}>{t("pricePro")}</th>
            <th>{t("quantity")}</th>
            <th>{t("totalP")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {carts.map((item, id) => (
            <ProductRow
              value={listCheck.includes(id)}
              checkValue={handleSelect}
              item={item}
              id={id}
              key={id}
              decre={decre}
              incre={incre}
              del={del}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-between text-xl items-center pl-6 bg-white mt-5 py-5">
        <div className="flex gap-4  w-[100%]">
          <div className="flex gap-2 ">
            <Checkbox
              name="all"
              value={listCheck.length === carts.length}
              checkValue={selectAll}
            />
            <label>
              {t("selectAll")} ({carts.length})
            </label>
          </div>
          <button>{t("del")}</button>
        </div>

        <div className="flex pr-4 text-base w-[70%] gap-3">
          <div
            className="flex gap-3"
            onMouseMove={() => setDetail(true)}
            onMouseOut={() => setDetail(false)}
          >
            <span className="flex flex-col">
              <span>{t("total")}:</span>
              <span className="flex items-center justify-center">
                ({listCheck.length}
                {listCheck.length > 1 ? " items" : " item"})
              </span>
            </span>
            <div className=" flex flex-col">
              <span className="flex items-center  gap-1 text-xl">
                ₫{new Intl.NumberFormat("en-DE").format(total)}
                {detail ? (
                  <TfiAngleUp className=" w-[12px] h-[12px]" />
                ) : (
                  <TfiAngleDown className=" w-[12px] h-[12px]" />
                )}
              </span>
              <div className="flex gap-3 text-sm">
                <span>{t("saved")} </span>
                <span className="text-main">
                  ₫
                  {new Intl.NumberFormat("en-DE").format(
                    Math.ceil(oldPrice - total) / 1000,
                    1,
                  )}
                  k
                </span>
              </div>
            </div>
          </div>
          <button
            className={`${
              listCheck.length > 0
                ? "hover:cursor-pointer"
                : "hover:cursor-not-allowed"
            } bg-main w-[200px] text-white px-4 py-2`}
            onClick={() => confirmCart()}
            title={listCheck.length > 0 ? "" : "Không có sản phẩm được chọn"}
            disabled={listCheck.length > 0 ? false : true}
          >
            {t("checkout")}
          </button>
        </div>
        {detail && (
          <div className=" absolute bottom-[25%] right-[20%]">
            <DiscountDetail oldPrice={oldPrice} actualPrice={total} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetail;
