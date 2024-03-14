import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductDetail = ({ setOpen, idPro, open }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function detailInfo() {
      const pro = await axios.get(`/product/find/${idPro}`);
      setProduct(pro.data);
    }

    detailInfo();
  }, [idPro]);

  return (
    <>
      {product && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className=" w-[500px] border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className=" text-base font-semibold flex items-center justify-between gap-2">
                    <img
                      src={product?.album[0]}
                      alt=""
                      className="w-[60px] h-[60px]"
                    />
                    {product.title}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col gap-2">
                  <span>Hãng: {product.brand}</span>
                  <span>Giá bán: ₫{product.actualPrice}</span>
                  <span>flash sale: {product.flashSale ? "Có" : "Không"}</span>
                  <span>Danh mục: {product.category}</span>
                  <span>Số lượng kho: {product.stock}</span>
                </div>
                {/*footer*/}
                <div className="  flex items-center justify-start p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="border border-[#757575] px-4 py-2 hover:text-black hover:bg-[#ee4d2d]"
                    onClick={() => setOpen(!open)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
