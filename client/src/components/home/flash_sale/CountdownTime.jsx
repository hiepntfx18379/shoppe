import Countdown from "react-countdown";
import React from "react";

const CountdownTime = () => {
  const time = 150000000;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return (
        <>
          <span className=" bg-black text-white font-bold p-1 mr-[2px]">
            00
          </span>
          <span className=" bg-black text-white font-bold p-1 mr-[2px]">
            00
          </span>
          <span className=" bg-black text-white font-bold p-1 mr-[2px]">
            00
          </span>
        </>
      );
    } else {
      // Render a countdown
      return (
        <>
          <span className=" bg-black text-white font-bold p-1 mr-[2px]">
            {hours < 10 ? `0${hours}` : hours}
          </span>
          <span className=" bg-black text-white font-bold p-1 mr-[2px]">
            {minutes < 10 ? `0${minutes}` : minutes}
          </span>
          <span className=" bg-black text-white font-bold p-1 mr-[2px]">
            {seconds < 10 ? `0${seconds} ` : seconds}
          </span>
        </>
      );
    }
  };
  return (
    <div>
      <Countdown date={Date.now() + time} renderer={renderer} />
    </div>
  );
};

export default CountdownTime;
