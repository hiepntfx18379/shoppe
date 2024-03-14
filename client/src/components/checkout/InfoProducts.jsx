import ProductRow from "./ProductRow";
import { useTranslation } from "react-i18next";

const InfoProducts = ({ products }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className=" w-[90%] m-auto mt-5 relative">
        {products.length > 0 ? (
          <table className="table-auto w-[100%] text-center">
            <thead className="bg-gray-200  tracking-widest">
              <tr className="">
                <th colSpan={2} className=" py-4 pl-5 ">
                  <label for="element">{t("product")}</label>
                </th>
                <th>{t("size")}</th>
                <th>{t("pricePro")}</th>
                <th>{t("quantity")}</th>
                <th>{t("totalP")}</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.map((item, id) => (
                <ProductRow item={item} key={id} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className=" bg-white p-5">
            <span className="text-black">{t("noPro")} </span>
          </div>
        )}
      </div>
    </>
  );
};

export default InfoProducts;
