import { FaFilter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterSize from "./FilterSize";
import FilterBrand from "./FilterBrand";
import { getAllPros, setResultFilter } from "../../home/productsHome.slide";

const arangeSize = [
  "34",
  "35",
  "36",
  "37",
  "38",
  "38.5",
  "39",
  "39.5",
  "40",
  "40.5",
  "41",
  "41.5",
  "42",
  "42.5",
  "43",
];
const arangeBrand = [
  "Mizuno",
  "Nike",
  "Adidas",
  "Kamito",
  "Zocker",
  "JOGABOLA",
  "Puma",
];

const SearchBox = () => {
  const dispatch = useDispatch();
  const [filterTags, setFilterTags] = useState([]);
  const { t } = useTranslation();
  const listPros = useSelector(getAllPros);

  useEffect(() => {
    const filteredDATA = listPros.filter((node) =>
      filterTags.length > 0
        ? filterTags.every(
            (filterTag) =>
              node.list_size.join(",").includes(filterTag) ||
              node.brand === filterTag,
          )
        : listPros,
    );
    window.scrollTo({ top: 140, behavior: "smooth" });
    dispatch(setResultFilter(filteredDATA));
  }, [filterTags, listPros, dispatch]);

  const getFilter = (e) => {
    if (e.target.checked) {
      setFilterTags([...filterTags, e.target.value]);
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== e.target.value),
      );
    }
  };

  return (
    <div className=" border border-slate-300 my-3">
      <div className=" bg-slate-300 py-2 px-1 flex gap-2">
        <FaFilter /> <span>{t("filter")}</span>
      </div>
      <div>
        <h2 className=" bg-slate-200 p-2">{t("size")}</h2>
        <div className="flex justify-between flex-wrap gap-3 p-[10px] bg-white">
          {arangeSize.map((size) => (
            <FilterSize title={size} getValue={getFilter} />
          ))}
        </div>
      </div>
      {/* <div>
        <h2 className=" bg-slate-200 p-2">{t("price")}</h2>
        <div className="flex flex-col gap-3 p-[10px] bg-white">
          {arangePrice.map((price) => (
            <FilterPrice title={price} getValue={getPrice} />
          ))}
        </div>
      </div> */}
      <div>
        <h2 className=" bg-slate-200 p-2">{t("brand")}</h2>
        <div className="flex flex-col gap-3 p-[10px] bg-white">
          {arangeBrand.map((brand) => (
            <FilterBrand title={brand} getValue={getFilter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
