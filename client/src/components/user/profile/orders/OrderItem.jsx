import React from "react";

const OrderItem = ({ item, id, setId, setDisplay }) => {
  const detail = (id) => {
    setDisplay(true);
    setId(id);
  };
  return (
    <tr className=" text-start">
      <td className=" w-[80px]">{`${item._id.substring(0, 15)}...`}</td>
      <td className="text-center w-[100px]">
        <span>{item.buyer?.receiver?.name}</span>
        <br />
        <span>{item.buyer?.receiver?.phone}</span>
      </td>

      <td>
        {item.buyer?.receiver?.detail} <br /> {item.buyer?.receiver?.address}
      </td>

      <td className="text-center">{item.products.length}</td>
      <td>₫ {new Intl.NumberFormat("en-DE").format(item.total)}</td>

      <td className="text-center">
        <span
          className={`${
            item.status ? " bg-[green] px-5" : "bg-[red]"
          } p-3 text-white font-medium`}
        >
          {item.status ? "Đã thanh toán" : "Chưa thanh toán"}
        </span>
      </td>
      <td>
        <span
          onClick={() => detail(id)}
          className="bg-main text-white font-medium p-3 hover:cursor-pointer"
        >
          Nhận hóa đơn
        </span>
      </td>
    </tr>
  );
};

export default OrderItem;
