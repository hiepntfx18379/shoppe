import React from "react";

const PopupOrderRow = ({ item }) => {
  return (
    <tr>
      <td className=" font-semibold">{item.name}</td>
      <td>
        <img width={50} height={50} src={item.img} alt="" />
      </td>
      <td>{item.size}</td>
      <td>
        {new Intl.NumberFormat("en-DE").format(
          Number(item.actualPrice.replaceAll(".", "")),
        )}
        <br />
        VND
      </td>
      <td>{item.quantity}</td>
      <td>
        {new Intl.NumberFormat("en-DE").format(
          Number(item.actualPrice.replaceAll(".", "")) * item.quantity,
        )}
        <br />
        VND
      </td>
    </tr>
  );
};

export default PopupOrderRow;
