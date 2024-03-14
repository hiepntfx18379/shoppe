import React from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

const DetailItem = ({ setDisplay, id, listOrders }) => {
  const { t } = useTranslation();
  const order = listOrders[id];

  const getBill = async () => {
    try {
      const res = await axios.post("/order/sendBill", { order });
      toast.success(res.data.message);
      setDisplay(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className=" w-full border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="p-5">
              <div className=" mb-4 flex text-lg justify-center text-black">
                Chi tiết đơn hàng
              </div>
              <div className="grid grid-cols-2 gap-2 justify-between items-center mb-4">
                <div className=" -mt-[18px]">
                  <div className=" mb-4  text-lg text-black">
                    Người đặt hàng
                  </div>
                  <div className=" flex flex-col gap-3">
                    <div className=" flex gap-2 items-center justify-start">
                      <span className="w-[100px]">Tên người đặt: </span>{" "}
                      <span> {order?.buyer?.name}</span>
                    </div>
                    <div className=" flex gap-2 items-center justify-start">
                      <span className="w-[100px]">Email: </span>{" "}
                      <span>{order?.buyer?.email}</span>
                    </div>
                    <div className=" flex gap-2 items-center justify-start">
                      <span className="w-[100px]">Số điện thoại: </span>{" "}
                      <span>{order?.buyer?.phone}</span>
                    </div>
                    <div className=" flex gap-2 items-center justify-start">
                      <span className="w-[100px]">
                        Phương thức thanh toán:{" "}
                      </span>{" "}
                      <span>
                        {order?.payment_method === "cod"
                          ? "Khi nhận hàng"
                          : "Cà thẻ"}
                      </span>
                    </div>
                    <div className=" flex gap-2 items-center justify-start">
                      <span className="w-[100px]">Trang thái: </span>{" "}
                      <span>
                        {order?.status === true
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className=" mb-4  text-lg text-black">
                    Người nhận hàng
                  </div>

                  <div className=" flex flex-col gap-3">
                    <div className=" flex gap-2 items-center justify-start">
                      <span className="w-[120px]">Tên người nhận: </span>
                      <span> {order?.buyer?.receiver?.name}</span>
                    </div>
                    <div className=" flex gap-2 items-center justify-start">
                      <span className="w-[120px]">Số điện thoại: </span>{" "}
                      <span>{order?.buyer?.receiver?.phone}</span>
                    </div>
                    <div className=" flex gap-2 justify-start">
                      <span className="w-[100px]"> Địa chỉ: </span>{" "}
                      <span>
                        {order?.buyer?.receiver?.detail} -
                        {order?.buyer?.receiver?.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mb-4 flex text-lg justify-center text-black">
                Chi tiết sản phẩm
              </div>

              <div>
                <table width="100%" border="1" style={{ textAlign: "center" }}>
                  <tr>
                    <th colSpan={2} className="w-[250px]">
                      Sản phẩm
                    </th>
                    <th className="w-[30px]">Cỡ</th>
                    <th className="w-[100px]">Đơn giá</th>
                    <th className="w-[50px]">Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>

                  {order.products.map((value) => {
                    return (
                      <tr>
                        <td>
                          <img width="80" height="80" src={value.img} alt="" />
                        </td>
                        <td>{value.name.substring(0, 40)}...</td>
                        <td>{value.size}</td>
                        <td>
                          <span>₫ {value.actualPrice}</span>
                        </td>
                        <td>
                          <span>{value.quantity}</span>
                        </td>

                        <td>
                          <span>
                            ₫
                            {new Intl.NumberFormat("en-DE").format(
                              Number(
                                `${value.actualPrice}`.replaceAll(".", ""),
                              ) * value.quantity,
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </table>
                <h2 className="flex justify-end">
                  <div className="text-xl">
                    Tổng:{" "}
                    <span className=" text-main  ">
                      ₫
                      {new Intl.NumberFormat("en-DE").format(
                        Number(order.total),
                      )}
                    </span>{" "}
                  </div>
                </h2>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 gap-4 border-t border-solid border-blueGray-200 rounded-b">
              <button
                onClick={() => getBill()}
                className="border border-[#757575] px-4 py-2 bg-[#ee4d2d] text-white"
              >
                Lấy hóa đơn
              </button>
              <button
                onClick={() => setDisplay(false)}
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

export default DetailItem;
