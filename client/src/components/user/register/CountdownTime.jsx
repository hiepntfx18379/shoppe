import Countdown from "react-countdown";

const CountdownTime = ({ time = 10000, k, completed }) => {
  const renderer = ({ minutes, seconds }) => {
    console.log(completed);
    if (completed) {
      // Render a complete state
      return (
        <>
          <h2>OTP hết hạn, vui lấy lại mã</h2>
        </>
      );
    } else {
      return (
        <>
          <span>
            {/* {minutes}:{seconds} */}
            Mã vô hiệu sau {seconds} s
          </span>
        </>
      );
    }
  };
  return (
    <div>
      <Countdown date={Date.now() + time} renderer={renderer} key={k} />
    </div>
  );
};

export default CountdownTime;
