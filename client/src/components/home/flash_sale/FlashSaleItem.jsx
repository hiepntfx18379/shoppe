import { Link } from "react-router-dom";

const FlashSaleItem = ({ pro }) => {
  return (
    <div className="text-center relative">
      <div className="w-[230px]  h-[248px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-center top-0 right-0 items-center absolute bg-[#ffe97a] text-[#ec3814] ">
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.23077 0H4.23077L0 7.82222L3.5 9.14286V16L10 5.68889L6.53846 4.62222L9.23077 0Z"
              fill="url(#paint0_linear_2216_10611)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_2216_10611"
                x1="0"
                y1="0"
                x2="0"
                y2="16"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EE4D2D"></stop>
                <stop offset="1" stop-color="#FF7337"></stop>
              </linearGradient>
            </defs>
          </svg>
          <span className="px-[2px]">
            -
            {(
              Math.fround(
                1 -
                  (
                    Number(pro.actualPrice.replace(".", "")) /
                    Number(pro.oldPrice.replace(".", ""))
                  ).toFixed(2),
              ) * 100
            ).toFixed(0)}
            %
          </span>
        </div>
        <div className="flex justify-center top-1 left-0 items-center absolute bg-main text-white ">
          <span className="px-[2px]">Yêu thích</span>
        </div>
        <Link
          to={`/detail/${pro._id}`}
          className="flex justify-center"
          title={`${pro.title}`}
        >
          <img
            src={pro.album[0]}
            className="hover:opacity-60"
            alt=""
            width="70%"
          />
        </Link>

        <div className=" font-semibold mt-4 mb-2">
          <div>{pro.title}</div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleItem;
