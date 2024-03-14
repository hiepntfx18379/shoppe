import fs from "../images/poster/flash_sale.png";
import CountdownTime from "./CountdownTime";
import ListSale from "./FlashSlide";

const FlashSale = ({ products }) => {
  return (
    <>
      <div className="flex justify-between px-5 py-3">
        <div className="flex gap-2  items-center">
          <img src={fs} alt="" width="130px" height="30px" />
          <CountdownTime />
        </div>
      </div>

      <ListSale products={products} />
    </>
  );
};

export default FlashSale;
