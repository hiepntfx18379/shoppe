import { FaFilter } from "react-icons/fa";

const FilterBox = () => {
  return (
    <div className="grid grid-cols-[1fr,2fr]">
      <div>
        <div>
          <FaFilter /> <span>Lọc kết quả</span>
        </div>
        <div>Tìm theo size</div>
        <div>Lọc theo giá</div>
        <div>Thương hiệu</div>
      </div>

      {/* section result filter */}
      <div>result</div>
    </div>
  );
};

export default FilterBox;
