import React from "react";

const FilterPrice = ({ title, getValue }) => {
  const handle = (e) => {
    if (e.target.checked) {
      console.log(e.target.min);
      console.log(e.target.max);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        onChange={(e) => handle(e)}
        min={title.range[0]}
        max={title.range[1]}
      />
      <label for="element">{title.label}</label>
    </div>
  );
};
export default FilterPrice;
