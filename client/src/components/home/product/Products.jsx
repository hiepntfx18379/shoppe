import React from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Products = ({ products }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className=" border-b-2 border-[#ee4d2d] flex justify-center text-[#ee4d2d] bg-white">
        <span className="py-2 uppercase">{t("suggest")}</span>
      </div>

      <div className="grid grid-cols-5 justify-between">
        {products.slice(0, 10).map((pro) => (
          <ProductItem item={pro} products={products} />
        ))}
      </div>

      <Link to="/seemore" className=" flex justify-center">
        <button className="bg-[#ee4d2d] text-white px-6 py-2 text-center mt-2 hover:text-[#ee2d4d] hover:font-bold hover:bg-white">
          {t("more")}
        </button>
      </Link>
    </div>
  );
};

export default Products;
