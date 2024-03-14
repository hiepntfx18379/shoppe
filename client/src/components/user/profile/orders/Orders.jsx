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
      <h2>Danh sách đặt</h2>
      <div className="px-3 mt-5 relative">
        {listOrders.length > 0 ? (
          <table className="table-auto">
            <thead className=" ">
              <tr>
                <th>Mã đơn hàng</th>
                <th scope="col" className="px-3 py-3 w-[150px]">
                  Người nhận
                </th>
                <th scope="col" className="px-3 py-3 w-[240px]">
                  Địa chỉ
                </th>
                <th scope="col" className="px-3 py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="px-3 py-3">
                  Tổng
                </th>
                <th scope="col" className="px-3 py-3 w-[145px]">
                  Trạng thái
                </th>
                <th scope="col" className="px-3 py-3">
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
