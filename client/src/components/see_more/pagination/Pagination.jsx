import React, { useEffect, useState } from "react";
import ProductItem from "../../home/product/ProductItem";
import { useTranslation } from "react-i18next";

function productAPage(listProduct, productPerPage, currentPage) {
  return listProduct.slice(
    (currentPage - 1) * productPerPage,
    (currentPage - 1) * productPerPage + productPerPage,
  );
}

const Pagination = ({ listPro, num = 9, col = 3 }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 123,
      behavior: "smooth",
    });
  }, [currentPage]);

  let listProduct = listPro;

  let productPerPage = num;
  let totalPage = Math.ceil(listProduct.length / productPerPage);
  let listProductSlice = [];

  const hanleNextPage = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  listProductSlice = productAPage(listProduct, productPerPage, currentPage);

  return (
    <>
      <div className={`grid grid-cols-${col} justify-between`}>
        {listProductSlice.map((pro, id) => {
          return <ProductItem item={pro} />;
        })}
      </div>
      <div className="flex justify-center items-center mt-4 -mb-2">
        <button
          onClick={handlePreviousPage}
          className="text-[#ee4d2d] border-[#ee4d2d] border py-2 px-4 hover:text-white hover:bg-[#ee4d2d]"
        >
          {t("previous")}
        </button>

        <span className="text-[#ee4d2d] font-black uppercase text-2xl px-4">
          {currentPage}
        </span>
        <button
          onClick={hanleNextPage}
          className="text-[#ee4d2d] border-[#ee4d2d] border py-2 px-4 hover:text-white hover:bg-[#ee4d2d]"
        >
          {t("next")}
        </button>
      </div>
    </>
  );
};

export default Pagination;
