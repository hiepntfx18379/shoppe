import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { infoUser } from "../../user.slide";
import axios from "axios";
import OrderItem from "./OrderItem";
import { useTranslation } from "react-i18next";
import DetailItem from "./DetailItem";

const Orders = () => {
  const info = useSelector(infoUser);
  const [listOrders, setListOrder] = useState([]);
  const [displayBill, setDisplayBill] = useState(false);
  const { t } = useTranslation();
  const [idOrder, setIdOrder] = useState("");

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.post("/order/orderUser", { email: info.email });
        setListOrder(res.data.orders);
      } catch {}
    };

    getList();
  }, [info]);

  return (
    <div>
      <h2 className="text-2xl text-black p-4">Danh sách đơn hàng</h2>
      <div className="px-3 relative">
        {listOrders.length > 0 ? (
          <table className="border-collapse border border-slate-400">
            <thead className=" ">
              <tr>
                <th className="px-3 py-3 w-[150px] border border-slate-300">
                  Mã đơn hàng
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 w-[150px] border border-slate-300"
                >
                  Người nhận
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 w-[240px] border border-slate-300"
                >
                  Địa chỉ
                </th>
                <th scope="col" className="px-3 py-3 border border-slate-300">
                  Sản phẩm
                </th>
                <th scope="col" className="px-3 py-3 border border-slate-300">
                  Tổng
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 w-[145px] border border-slate-300"
                >
                  Trạng thái
                </th>
                <th scope="col" className="px-3 py-3 border border-slate-300">
                  Hóa đơn
                </th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {listOrders.map((item, id) => (
                <OrderItem
                  item={item}
                  key={id}
                  id={id}
                  setId={setIdOrder}
                  setDisplay={setDisplayBill}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className=" bg-white p-5">
            <span className="text-black">{t("noPro")} </span>
          </div>
        )}
      </div>
      {displayBill && (
        <>
          <DetailItem
            id={idOrder}
            listOrders={listOrders}
            setDisplay={setDisplayBill}
          />
        </>
      )}
    </div>
  );
};

export default Orders;
