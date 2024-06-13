import "./widget.scss";

const Widget = ({ user, count, title, notPay }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span
          className={`counter ${
            notPay ? "text-[red] text-base font-bold" : "text-black"
          }`}
        >
          {new Intl.NumberFormat("en-DE").format(count)} VND
        </span>
        <span className="link">View details</span>
      </div>
      <div className="right">
        <span className="title">Số người</span>
        <span className="counter">
          {new Intl.NumberFormat("en-DE").format(user)}
        </span>
        <span className="link">View details</span>
      </div>
    </div>
  );
};

export default Widget;
