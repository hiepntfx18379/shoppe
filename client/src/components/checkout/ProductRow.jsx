const ProductRow = ({ item }) => {
  return (
    <tr>
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
        <span className=" flex items-center font-semibold">{item.size}</span>
      </td>

      <td>
        ₫ <span>{item.actualPrice}</span>
      </td>
      <td className="">
        <span className="flex justify-center items-center text-black py-1 px-5">
          <span className="px-4 box-border text-lg">{item.quantity}</span>
        </span>
      </td>
      <td>
        ₫
        {new Intl.NumberFormat("en-DE").format(
          Number(item.actualPrice.replaceAll(".", "")) * item.quantity,
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
