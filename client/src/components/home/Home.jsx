import { useEffect, useState } from "react";
import Advertisement from "./category/Advertisement";
import Category from "./category/Category";
import FlashSale from "./flash_sale/FlashSale";
import Navbar from "./navbar/Navbar";
import Products from "./product/Products";
import Poster from "./services/Poster";
import Services from "./services/Services";
import Voucher from "./voucher/Voucher";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAll } from "./productsHome.slide";

const Home = () => {
  const [listProducts, setListProducts] = useState([]);
  const [listFlashSale, setListFlashSale] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      const ss = await axios.get("/product");
      setListProducts(ss.data);
      const listSale = ss.data.filter((x) => x.flashSale === true);
      setListFlashSale(listSale);
      dispatch(setAll(ss.data));
    };

    getAllProducts();
  }, [dispatch]);

  return (
    <>
      {/* section 1 */}
      <div className="bg-white ">
        <Navbar list={listProducts} />
        <div className="m-auto w-[90%] ">
          <div className="h-[383px]">
            <div className="grid grid-cols-[2fr,1fr] gap-1 mt-10 h-[235px] -z-40">
              <Advertisement />
              <div className="grid grid-rows-2 gap-1">
                <Poster />
              </div>
            </div>
            <Services />
          </div>
        </div>
      </div>

      <div className="w-[90%] bg-white   m-auto mt-8 ">
        {/* Category */}
        <Category />
      </div>

      <div className="w-[90%] m-auto mt-8">
        <FlashSale products={listFlashSale} />
      </div>

      <div className=" w-[90%] m-auto mt-8">
        <Voucher />
      </div>

      <div className=" w-[90%] m-auto mt-8">
        <Products products={listProducts} />
      </div>
    </>
  );
};

export default Home;
