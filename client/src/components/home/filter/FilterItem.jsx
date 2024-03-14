const FilterItem = ({ title, array }) => {
  return (
    <div>
      <span className=" bg-slate-400 text-black text-xl">{title}</span>
      <select>
        {array.map((data) => (
          <option value={data}>{data}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterItem;
