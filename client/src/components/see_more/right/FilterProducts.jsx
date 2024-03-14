import { useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import { getResultFilter } from "../../home/productsHome.slide";

const FilterProducts = () => {
  const productSelector = useSelector(getResultFilter);

  return <Pagination listPro={productSelector} />;
};

export default FilterProducts;
