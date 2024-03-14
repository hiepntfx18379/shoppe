import React from "react";

const PopupOrderRow = ({ item }) => {
  return (
    <tr>
      <td className=" font-semibold">{item.name}</td>
      <td>
        <img width={50} height={50} src={item.photos[1]} alt="" />
      </td>
      <td>
        {new Intl.NumberFormat("en-DE").format(item.price)}
        <br />
        VND
      </td>
      <td>{item.quantity}</td>
      <td>
        {new Intl.NumberFormat("en-DE").format(item.price * item.quantity)}
        <br />
        VND
      </td>
    </tr>
  );
};

export default PopupOrderRow;
