import React from "react";

const Title = ({ title }) => {
  return (
    <span className="hover:bg-white hover:rounded-md hover:text-main">
      {title}
    </span>
  );
};

export default Title;
