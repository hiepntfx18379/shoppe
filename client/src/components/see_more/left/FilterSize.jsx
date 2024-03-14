import React from "react";

const FilterSize = ({ title, getValue }) => {
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        value={title}
        name={title}
        onChange={(e) => getValue(e)}
      />
      <label for="element">{title}</label>
    </div>
  );
};
export default FilterSize;
