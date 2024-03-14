const Checkbox = ({ id, value, checkValue }) => {
  return (
    <div>
      <input
        type="checkbox"
        value={value}
        checked={value}
        onChange={(e) => checkValue(e, id)}
        style={{ accentColor: "#ee4d2d" }}
      />
    </div>
  );
};

export default Checkbox;
