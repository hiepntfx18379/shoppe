import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";
import Checkbox from "./Checkbox";

const ProductRow = ({ item, checkValue, value, incre, decre, del, id }) => {
  return (
    <tr>
      <td className="pl-5">
        <Checkbox id={id} value={value} checkValue={checkValue} />
      </td>
      <td className="grid grid-cols-[80px,auto] items-center justify-around gap-2 px-3">
        <img
          src={item.img}
          alt=""
          className=" w-[80px] h-[80px] object-cover"
        />
      </td>

      <td>
        <span className=" flex items-center justify-items-start font-semibold">
          {item.name}
        </span>
      </td>

      <td>
        <span className=" font-semibold">{item.size}</span>
      </td>

      <td>
        <span className=" line-through text-[#757575]">
          ₫ <span>{item.oldPrice}</span>
        </span>
      </td>
      <td>
        ₫ <span>{item.actualPrice}</span>
      </td>

      <td className="">
        <span className="flex justify-center items-center text-black py-1 px-5">
          <button
            className="border border-[#757575]"
            onClick={() => decre(item)}
          >
            <AiOutlineMinus />
          </button>
          <span className="px-4 box-border text-lg">{item.quantity}</span>
          <button
            className="border border-[#757575]"
            onClick={() => incre(item)}
          >
            <IoMdAdd />
          </button>
        </span>
      </td>
      <td>
        ₫
        {new Intl.NumberFormat("en-DE").format(
          Number(item.actualPrice.replaceAll(".", "")) * item.quantity,
        )}
      </td>
      <td>
        <button onClick={() => del(item)} className=" hover:cursor-pointer">
          <IoTrashBinSharp className="h-8 w-8" />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
