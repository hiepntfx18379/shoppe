import React from "react";

const CommentFb = ({ link, width }) => {
  return (
    <div className=" w-[90%] m-auto">
      <h2 className="text-2xl font-semibold mt-2">Bình luận</h2>
      <div
        class="fb-comments"
        data-href={link}
        data-width={width}
        data-numposts="5"
      ></div>
    </div>
  );
};

export default CommentFb;
