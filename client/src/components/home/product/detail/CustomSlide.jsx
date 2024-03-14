import React from "react";

const Slide = ({ link, setId, id }) => {
  return (
    <div>
      <img
        src={link}
        onMouseMove={() => setId(id)}
        alt="images slide"
        width="82px"
        height="82px"
      />
    </div>
  );
};

export default Slide;
